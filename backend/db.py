from contextlib import contextmanager
from decimal import Decimal, ROUND_DOWN, ROUND_UP

from sqlalchemy import create_engine, Table, MetaData, func, column, update
from sqlalchemy.future import select

from backend.cache import redis
from backend.exceptions import DBColumnDoesNotExist, InsufficientPopulationSize
from backend.xml import MatchingConfigParser


class DBApi:
    weight_col = column("poids")

    def __init__(self, connection, table, db_data, schema):
        self.connection = connection
        self.table = table
        self.db_data = db_data
        self.schema = schema

    def inline_tables(self):
        yield "id"
        for similarity_col, data_cols in self.schema.items():
            for cols in data_cols["cols"].values():
                for col in cols:
                    yield col
            yield similarity_col
        yield "score_confiance"
        yield "prediction_annotation"
        yield "poids"

    def check_tables(self):
        existing_columns = self.table.columns.keys()
        for col in self.inline_tables():
            if col not in existing_columns:
                raise DBColumnDoesNotExist(
                    f"The column {col!r} does not exist", column=col
                )

    def get_score_boundaries(self):

        min_score, max_score = self.connection.execute(
            select(
                func.min(self.table.c.score_confiance),
                func.max(self.table.c.score_confiance),
            )
            .select_from(self.table)
            .where(self.table.c.poids.is_(None))
        ).one()

        if None in (min_score, max_score):
            return None, None

        return {
            "min": float(
                Decimal(min_score).quantize(Decimal("0.00"), rounding=ROUND_DOWN)
            ),
            "max": float(
                Decimal(max_score).quantize(Decimal("0.00"), rounding=ROUND_UP)
            ),
        }

    def sample(self, min_score, max_score, size):

        weight = (
            self.connection.execute(
                select(func.count(self.table.c.id))
                .select_from(self.table)
                .where(
                    self.table.c.poids.is_(None),
                    max_score >= self.table.c.score_confiance,
                    self.table.c.score_confiance >= min_score,
                )
            ).scalar()
            / size
        )

        selection = (
            select(self.table.c.id)
            .select_from(self.table)
            .where(
                max_score >= self.table.c.score_confiance,
                self.table.c.score_confiance >= min_score,
                self.table.c.poids.is_(None),
            )
            .order_by(func.random())
            .limit(size)
        )

        results = list(
            self.connection.execute(
                update(self.table)
                .where(self.table.c.id.in_(selection))
                .values({self.table.c.poids: weight})
                .returning(*[column(c) for c in self.inline_tables()])
            )
        )

        actual_size = len(results)
        if actual_size < size:
            raise InsufficientPopulationSize(
                f"You requested {size} elements, but only {actual_size} are available",
                requested_size=size,
                actual_size=actual_size,
            )
        return results

    def reset_weight(self):
        return self.connection.execute(
            update(self.table).values({self.table.c.poids: None})
        )

    def update_pair_status(self, pair_id, status):
        self.connection.execute(
            update(self.table)
            .where(self.table.c.id == pair_id)
            .values({self.table.c.prediction_annotation: status})
        )

    @classmethod
    @contextmanager
    def db_from_xml(cls, xml):
        xml = MatchingConfigParser(xml)
        with cls.db_from_parser(xml) as api:
            yield api

    @classmethod
    @contextmanager
    def db_from_parser(cls, xml):
        db_data = xml.db_data()

        engine = create_engine(db_data["uri"])

        table = Table(
            xml.output_table(),
            MetaData(bind=None),
            autoload=True,
            autoload_with=engine,
            schema=db_data["schema"],
        )

        with engine.connect() as connection:
            with connection.begin():
                yield cls(connection, table, db_data, xml.pairs())

    @classmethod
    @contextmanager
    def db_from_cache(cls, uid):
        datasource = redis.load_datasource(uid)
        db_data = datasource["db_data"]

        engine = create_engine(db_data["uri"])

        table = Table(
            datasource["table"],
            MetaData(bind=None),
            autoload=True,
            autoload_with=engine,
            schema=db_data["schema"],
        )

        with engine.connect() as connection:
            with connection.begin():
                yield cls(connection, table, db_data, datasource["schema"])

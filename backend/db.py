from contextlib import contextmanager

from sqlalchemy import create_engine, Table, MetaData, func, column, update
from sqlalchemy.future import select

from backend.exceptions import DBColumnDoesNotExist, InsuffisantSampleSize
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
        return self.connection.execute(
            select(
                func.min(self.table.c.score_confiance),
                func.max(self.table.c.score_confiance),
            )
                .select_from(self.table)
                .where(self.table.c.poids.is_(None))
        ).one()

    def sample(self, min_score, max_score, size):

        weight = self.connection.execute(select(func.count()).select_from(self.table)).scalar() / size

        columns = [column(c) for c in self.inline_tables()]

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
                    .returning(*columns)
            )
        )

        actual_size = len(results)
        if actual_size < size:
            raise InsuffisantSampleSize(
                f"You requested {size} elements, but only {actual_size} are available",
                requested_size=size,
                actual_size=actual_size,
            )
        return results

    def reset_weight(self):
        return self.connection.execute(
            update(self.table).values({self.table.c.poids: None})
        )

    @classmethod
    @contextmanager
    def db_from_xml(cls, xml):

        xml = MatchingConfigParser(xml)
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
            yield cls(connection, table, db_data, xml.pairs())

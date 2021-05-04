from contextlib import contextmanager

from sqlalchemy import create_engine, Table, MetaData, select, func, column

from backend.exceptions import DBColumnDoesNotExist
from backend.xml import MatchingConfigParser


class DBApi:
    score_col = column("score_confiance")
    weight_col = column("poids")

    def __init__(self, connection, table, db_data, schema):
        self.connection = connection
        self.table = table
        self.db_data = db_data
        self.schema = schema

    def inline_tables(self):
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
                raise DBColumnDoesNotExist(f"The column {col!r} does not exist", column=col)

    def get_score_boundaries(self):
        return self.connection.execute(
            select(
                func.min(self.score_col), func.max(self.score_col)
            ).select_from(self.table).where(self.weight_col == None)
        ).one()

    def sample(self, min_score, max_score, count):
        columns = (column(c) for c in self.inline_tables())
        return self.connection.execute(
            select(*columns)
                .select_from(self.table)
                .where(max_score >= self.score_col, self.score_col >= min_score, self.weight_col == None)
                .order_by(func.random())
                .limit(count)
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

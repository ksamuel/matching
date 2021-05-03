from sqlalchemy import create_engine, Table, MetaData

from backend.views import MatchingConfigParser


def test_connection(fs):
    xml = MatchingConfigParser(fs.XML_APPRENTI)

    engine = create_engine(xml.db_uri())

    table = Table(
        xml.ouput_table(),
        MetaData(bind=None),
        autoload=True,
        autoload_with=engine
    )

    with engine.connect() as connection:
        result = connection.execute(table.select())
        assert len(list(result)) > 100

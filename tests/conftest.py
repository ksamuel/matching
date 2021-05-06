from types import SimpleNamespace

import pytest
from django.conf import settings


class FS(SimpleNamespace):
    TESTS_DIR = settings.BASE_DIR / "tests"
    FIXTURES_DIR = TESTS_DIR / "fixtures"
    XML_APPRENTI = (
        FIXTURES_DIR
        / "appariement_qualite_ij_apprenti_champ_2018_2019_ij_sia_apprenti_01122018_31122018.xml"
    )
    XML_SALARIE = (
        FIXTURES_DIR
        / "appariement_qualite_ij_apprenti_champ_restreint_2018_2019_ij_sismmo_salarie_01122018_31122018.xml"
    )
    XML_NO_PORT = FIXTURES_DIR / "no_port.xml"
    XML_WRONG_COL = FIXTURES_DIR / "wrong_col.xml"
    XML_WRONG_NETLOC = FIXTURES_DIR / "wrong_netloc.xml"


@pytest.fixture
def fs():
    yield FS()


@pytest.fixture
def xml_apprenti(fs):
    with fs.XML_APPRENTI.open() as f:
        yield f


@pytest.fixture
def xml_salarie(fs):
    with fs.XML_SALARIE.open() as f:
        yield f

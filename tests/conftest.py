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
    XML_ERROR = FIXTURES_DIR / "error.xml"


@pytest.fixture
def fs():
    yield FS()

import pytest
from sqlalchemy import column, select, text, func, table

from backend.db import DBApi
from backend.exceptions import DBColumnDoesNotExist


def test_inline_tables(fs):
    with DBApi.db_from_xml(fs.XML_APPRENTI) as api:
        assert list(api.inline_tables()) == [
            "nom_1_r_ij_apprenti_champ",
            "nom_2_r_ij_apprenti_champ",
            "nom_1_r_ij_sia_apprenti_decembre",
            "nom_2_r_ij_sia_apprenti_decembre",
            "similarite_nom",
            "prenom_1_r_ij_apprenti_champ",
            "prenom_2_r_ij_apprenti_champ",
            "prenom_3_r_ij_apprenti_champ",
            "prenom_1_r_ij_sia_apprenti_decembre",
            "prenom_2_r_ij_sia_apprenti_decembre",
            "prenom_3_r_ij_sia_apprenti_decembre",
            "similarite_prenom",
            "jour_naissance_ij_apprenti_champ",
            "mois_naissance_ij_apprenti_champ",
            "annee_naissance_ij_apprenti_champ",
            "jour_naissance_ij_sia_apprenti_decembre",
            "mois_naissance_ij_sia_apprenti_decembre",
            "annee_naissance_ij_sia_apprenti_decembre",
            "similarite_datenaissance",
            "sexe_ij_apprenti_champ",
            "sexe_ij_sia_apprenti_decembre",
            "similarite_sexe",
            "score_confiance",
            "prediction_annotation",
            "poids",
        ]


def test_check_table(fs):
    with DBApi.db_from_xml(fs.XML_WRONG_COL) as api:
        with pytest.raises(DBColumnDoesNotExist):
            api.check_tables()


def test_select_sample(fs):
    with DBApi.db_from_xml(fs.XML_APPRENTI) as api:
        results = api.sample(
            *api.get_score_boundaries(),
            5,
        )
        assert len(list(results)) == 5


def test_get_max_score(fs):
    with DBApi.db_from_xml(fs.XML_APPRENTI) as api:
        assert (0.30519999999999997, 2.2719999999999994) == api.get_score_boundaries()

from django.conf import settings

import pytest
from lxml.etree import XMLSyntaxError

from backend.views import MatchingConfigParser



def test_xml_is_checked_against_xsd(fs):
    MatchingConfigParser(fs.XML_APPRENTI)
    with pytest.raises(XMLSyntaxError):
        MatchingConfigParser(fs.XML_ERROR)


def test_get_db_url(fs):
    url = f"postgresql://matching_db:{settings.INSERJEUNES_DB_PWD}@localhost:5432/matching_db?options=-csearch_path%3Dannee_2018_2019"

    assert (
        MatchingConfigParser(fs.XML_APPRENTI).db_uri() == url
    ), "The DB url extracted from the XML should match"


def test_get_output_table(fs):
    assert (
        MatchingConfigParser(fs.XML_APPRENTI).ouput_table()
        == "rl_qualite_app_sia_approche"
    ), "The table named should be extracted from the XML should match"


def test_get_pairs(fs):
    assert MatchingConfigParser(fs.XML_APPRENTI).pairs() == {
        "similarite_nom": {
            "cols": {
                "ij_apprenti_champ": [
                    "nom_1_r_ij_apprenti_champ",
                    "nom_2_r_ij_apprenti_champ",
                ],
                "ij_sia_apprenti_decembre": [
                    "nom_1_r_ij_sia_apprenti_decembre",
                    "nom_2_r_ij_sia_apprenti_decembre",
                ],
            },
            "type": "name",
        },
        "similarite_prenom": {
            "cols": {
                "ij_apprenti_champ": [
                    "prenom_1_r_ij_apprenti_champ",
                    "prenom_2_r_ij_apprenti_champ",
                    "prenom_3_r_ij_apprenti_champ",
                ],
                "ij_sia_apprenti_decembre": [
                    "prenom_1_r_ij_sia_apprenti_decembre",
                    "prenom_2_r_ij_sia_apprenti_decembre",
                    "prenom_3_r_ij_sia_apprenti_decembre",
                ],
            },
            "type": "name",
        },
        "similarite_datenaissance": {
            "cols": {
                "ij_apprenti_champ": [
                    "jour_naissance_ij_apprenti_champ",
                    "mois_naissance_ij_apprenti_champ",
                    "annee_naissance_ij_apprenti_champ",
                ],
                "ij_sia_apprenti_decembre": [
                    "jour_naissance_ij_sia_apprenti_decembre",
                    "mois_naissance_ij_sia_apprenti_decembre",
                    "annee_naissance_ij_sia_apprenti_decembre",
                ],
            },
            "type": "date",
        },
        "similarite_sexe": {
            "cols": {
                "ij_apprenti_champ": ["sexe_ij_apprenti_champ"],
                "ij_sia_apprenti_decembre": ["sexe_ij_sia_apprenti_decembre"],
            },
            "type": "verbatim",
        },
    }


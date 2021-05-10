import logging
import uuid
from difflib import ndiff

from django import forms
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from sqlalchemy.exc import (
    DisconnectionError,
    DBAPIError,
    OperationalError,
    NoSuchTableError,
)

from backend.cache import redis
from backend.db import DBApi
from backend.exceptions import (
    DBColumnDoesNotExist,
    RequestedSampleIsTooBig,
    InsufficientPopulationSize,
)
from backend.xml import MatchingConfigParser

log = logging.getLogger(__name__)


class UploadFileForm(forms.Form):
    xml = forms.FileField()


def common_chars(first, second):
    for char in ndiff(first, second):
        match = char[0]
        if match != "+":
            yield match == " "


def common_chars_pair(first, second):
    return {
        first: list(common_chars(first, second)),
        second: list(common_chars(second, first)),
    }


@csrf_exempt
@require_http_methods(["POST"])
def upload_file(request):
    form = UploadFileForm(request.POST, request.FILES)
    if form.is_valid():

        xml = MatchingConfigParser(request.FILES["xml"])

        try:
            with DBApi.db_from_parser(xml) as api:

                api.check_tables()

                uid = xml.hash()

                redis.save_datasource(
                    uid,
                    {
                        "name": form.cleaned_data["xml"].name,
                        "schema": api.schema,
                        "db_data": api.db_data,
                        "table": xml.output_table(),
                    },
                )

                return HttpResponse(uid)
        except (DisconnectionError, TimeoutError, OperationalError) as e:
            log.exception("Connection error in XML upload page.")
            return HttpResponse(
                f"Il y a un problème de connection avec le serveur '{xml.db_data()['netloc']}'. Veuillez réessayer. Si "
                "le problème persiste, vérifiez que les données de connexion du XML sont valides. Si cela ne résout "
                "pas le problème, contactez votre service informatique.",
                status=500,
            )

        except DBAPIError:

            log.exception("Data base error in XML upload page.")
            return HttpResponse(
                f"Une erreur est survenue en tentant d'accéder aux données d'échantillongage. "
                "Le problème vient sans doute du logiciel, pas de votre part. Contactez votre service informatique.",
                status=500,
            )

        except DBColumnDoesNotExist as e:
            log.exception("XML contains bad column in XML upload page.")
            return HttpResponse(
                f"Le XML contient la colonne '{e.column}' qui n'existe pas sur le serveur '{xml.db_data()['netloc']}' "
                f"dans la table '{xml.output_table()}' sous le schema '{xml.db_data()['schema']}'",
                status=400,
            )

        except NoSuchTableError as e:
            log.exception("XML contains bad table in XML upload page.")
            return HttpResponse(
                f"Le XML contient la table '{xml.output_table()}' "
                f"'qui n'existe pas sur le serveur '{xml.db_data()['netloc']}' dans le schema '{xml.db_data()['schema']}'",
                status=400,
            )

        except Exception:

            log.exception("Unknown error in XML upload page.")

            return HttpResponse(
                f"Une erreur inconnue est survenue en tentant d'accéder aux données d'échantillongage. "
                "Le problème vient sans doute du logiciel, pas de votre part. Contactez votre service informatique.",
                status=500,
            )

    (field, [msg, *_]), *_ = form.errors.items()
    return HttpResponse(f"{field}: {msg}", status=400)


@api_view()
def datasource_list(request):
    return Response(redis.load_datasources())


@api_view()
def datasource(request, datasource_id):
    datasource = redis.load_datasource(datasource_id)
    datasource.pop("db_data")
    return Response({"id": datasource_id, **datasource})


@api_view()
def score_boundaries(request, datasource_id):
    with DBApi.db_from_cache(datasource_id) as api:
        return Response(api.get_score_boundaries())


@api_view(["POST"])
@parser_classes([JSONParser])
def create_sample(request, datasource_id):
    try:
        with DBApi.db_from_cache(datasource_id) as api:
            count = int(request.data["count"])
            min = float(request.data["min"])
            max = float(request.data["max"])
            sample_id = str(uuid.uuid4())

            pairs = api.sample(min, max, count)
    except InsufficientPopulationSize as e:
        raise RequestedSampleIsTooBig(e.requested_size, e.actual_size)

    redis.save_sample(datasource_id, sample_id, count, min, max, pairs)
    return Response(redis.load_sample_params(sample_id))


@api_view(["PUT"])
def update_pair_status(request, sample_id, pair_id):
    redis.update_pair_status(sample_id, pair_id, request.data["status"])
    return Response("ok")


@api_view()
def get_sample_data(request, sample_id):
    sample = redis.load_sample(sample_id)
    datasource = redis.load_sample_params(sample_id)["datasource"]
    schema = redis.load_datasource(datasource)["schema"]

    schema = {
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

    row = {
        "id": "040007485GJ1900030015",
        "nom_1_r_ij_apprenti_champ": "SISSOKO",
        "nom_2_r_ij_apprenti_champ": None,
        "nom_1_r_ij_sia_apprenti_decembre": "BORD",
        "nom_2_r_ij_sia_apprenti_decembre": None,
        "similarite_nom": 0.0,
        "prenom_1_r_ij_apprenti_champ": "SIDI",
        "prenom_2_r_ij_apprenti_champ": "LAMINE",
        "prenom_3_r_ij_apprenti_champ": "DJIBRIL",
        "prenom_1_r_ij_sia_apprenti_decembre": "JULIEN",
        "prenom_2_r_ij_sia_apprenti_decembre": None,
        "prenom_3_r_ij_sia_apprenti_decembre": None,
        "similarite_prenom": 0.5444444444444443,
        "jour_naissance_ij_apprenti_champ": 19,
        "mois_naissance_ij_apprenti_champ": 10,
        "annee_naissance_ij_apprenti_champ": 2001,
        "jour_naissance_ij_sia_apprenti_decembre": 19,
        "mois_naissance_ij_sia_apprenti_decembre": 10,
        "annee_naissance_ij_sia_apprenti_decembre": 2001,
        "similarite_datenaissance": 1.0,
        "sexe_ij_apprenti_champ": 1,
        "sexe_ij_sia_apprenti_decembre": 1,
        "similarite_sexe": 1,
        "score_confiance": 0.476570781893004,
        "prediction_annotation": None,
        "poids": 6.673333333333333,
    }

    example = {
        "pairs": {
            "similarite_nom": {"value1": "sissoko", "value2": "bord", "similarity": 0.0}
        },
        "score": 0.476570781893004,
        "status": None,
    }

    sample_table = []
    for row in sample:

        table_line = {
            "score": f"{row['score_confiance']:.2f}",
            "status": row.get("status", None),
            "id": row["id"],
        }
        table_line["pairs"] = pairs = {}

        for similarity_name, structure in schema.items():
            names = structure["cols"]
            field_type = structure["type"]

            fields1_names, fields2_names = [
                [name for name in names] for _, names in names.items()
            ]

            if field_type == "date":
                sep = "/"
                formatter = lambda x: str(x or "").zfill(2)
            else:
                sep = " "
                formatter = lambda x: str(x or "").title()

            pairs[similarity_name] = {
                "value1": sep.join(formatter(row[name]) for name in fields1_names),
                "value2": sep.join(formatter(row[name]) for name in fields2_names),
                "similarity": f"{row[similarity_name]:.2f}",
            }

        sample_table.append(table_line)

    return Response(sample_table)


@api_view()
def get_sample_params(request, sample_id):
    return Response(redis.load_sample_params(sample_id))


@api_view()
def sample(request, sample_id):
    return Response(
        [
            {
                "id": "1",
                "pairs": [
                    {"name": "similarite_nom", "values": ["TIENE", "TIENE"]},
                    {"name": "similarite_prenom", "values": ["ANDREA", "LEANDRE"]},
                    {"name": "similarite_dateNaissance", "values": ["24/12/2002"]},
                    {
                        "name": "similarite_codeCommuneNaissance",
                        "values": ["99326", "91228"],
                    },
                    {"name": "similarite_sexe", "values": ["1", "0"]},
                ],
                "score": 0.5359286694101509,
                "status": None,
            },
            {
                "id": "2",
                "pairs": [
                    {"name": "similarite_nom", "values": ["LONGCHE", "LONGCHAMP"]},
                    {"name": "similarite_prenom", "values": ["RAPHAEL", "ISMAEL"]},
                    {
                        "name": "similarite_dateNaissance",
                        "values": ["24/12/2002", "24/12/2000"],
                    },
                    {
                        "name": "similarite_codeCommuneNaissance",
                        "values": ["33318", "06085"],
                    },
                    {"name": "similarite_sexe", "values": ["1", "1"]},
                ],
                "score": 0,
                "status": "nok",
            },
            {
                "id": "3",
                "pairs": [
                    {"name": "similarite_nom", "values": ["LONGCHE", "LONGCHE"]},
                    {"name": "similarite_prenom", "values": ["MELVIN", "MELVIN"]},
                    {
                        "name": "similarite_dateNaissance",
                        "values": ["24/12/2002", "24/12/2002"],
                    },
                    {
                        "name": "similarite_codeCommuneNaissance",
                        "values": ["33318", "33318"],
                    },
                    {"name": "similarite_sexe", "values": ["0", "0"]},
                ],
                "score": 3.2,
                "status": "ok",
            },
            {
                "id": "4",
                "pairs": [
                    {"name": "similarite_nom", "values": ["CAMPET", "CAMPET"]},
                    {"name": "similarite_prenom", "values": ["ALEX", "ALEX"]},
                    {
                        "name": "similarite_dateNaissance",
                        "values": ["23/12/2002", "24/12/2002"],
                    },
                    {
                        "name": "similarite_codeCommuneNaissance",
                        "values": ["33318", "33318"],
                    },
                    {"name": "similarite_sexe", "values": ["0", "0"]},
                ],
                "score": 3.1,
                "status": "?",
            },
        ]
    )

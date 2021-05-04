from difflib import ndiff

from django.http import HttpResponse

from django import forms
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view

from rest_framework.response import Response

from backend.xml import MatchingConfigParser


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
def upload_file(request):
    form = UploadFileForm(request.POST, request.FILES)
    if form.is_valid():
        # Check file size limit

        parser = MatchingConfigParser(request.FILES["xml"])
        return HttpResponse(parser.db_uri())

    return HttpResponse("Error", 500)


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

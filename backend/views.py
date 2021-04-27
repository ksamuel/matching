from django.shortcuts import render


from django.http import  HttpResponse

from django import forms
from django.views.decorators.csrf import csrf_exempt

from lxml import etree

class UploadFileForm(forms.Form):
    xml = forms.FileField()

class MatchingConfigParser:

    xsd = "/home/user/Work/dev_pro/depp/matching/repo/backend/matching.xsd"
    schema = etree.XMLSchema(etree.parse(xsd))
    xml_parser = etree.XMLParser(schema = schema)

    def __init__(self, path):
        self.xml = etree.parse(path, self.xml_parser)

    def db_uri(self):
        port, netloc = self.xml.xpath("//*/databaseParameter[1]/serverParameter/@*[name()='port' or name()='server']")
        password, user = self.xml.xpath("//*/databaseParameter[1]/userParameter/@*[name()='password' or name()='user']")
        dbname, schema = self.xml.xpath("//*/databaseParameter[1]/baseParameter/@*[name()='database' or name()='schema']")

        return f"postgresql://{user}:{password}@{netloc}:{port}/{dbname}"

@csrf_exempt
def upload_file(request):

    form = UploadFileForm(request.POST, request.FILES)
    if form.is_valid():
        # Check file size limit

        parser = MatchingConfigParser(request.FILES['xml'])
        return HttpResponse(parser.db_uri())

    return HttpResponse("Error", 500)
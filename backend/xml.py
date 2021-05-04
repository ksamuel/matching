from lxml import etree

from django.conf import settings


class MatchingConfigParser:
    xsd = "/home/user/Work/dev_pro/depp/matching/repo/backend/matching.xsd"
    schema = etree.XMLSchema(etree.parse(xsd))
    xml_parser = etree.XMLParser(schema=schema)

    def __init__(self, path):
        self.xml = etree.parse(str(path), self.xml_parser)

    def db_uri(self):
        port, netloc = self.xml.xpath(
            "//*/databaseParameter[1]/serverParameter/@*[name()='port' or name()='server']"
        )
        password, user = self.xml.xpath(
            "//*/databaseParameter[1]/userParameter/@*[name()='password' or name()='user']"
        )
        dbname, schema = self.xml.xpath(
            "//*/databaseParameter[1]/baseParameter/@*[name()='database' or name()='schema']"
        )

        if all(l == "*" for l in password):
            password = settings.INSERJEUNES_DB_PWD

        return (
            f"postgresql://{user}:{password}@{netloc}:{port}/{dbname}?options=-csearch_path%3D{schema}"
        )

    def db_data(self):
        port, netloc = self.xml.xpath(
            "//*/databaseParameter[1]/serverParameter/@*[name()='port' or name()='server']"
        )
        password, user = self.xml.xpath(
            "//*/databaseParameter[1]/userParameter/@*[name()='password' or name()='user']"
        )
        dbname, schema = self.xml.xpath(
            "//*/databaseParameter[1]/baseParameter/@*[name()='database' or name()='schema']"
        )

        if all(l == "*" for l in password):
            password = settings.INSERJEUNES_DB_PWD

        return {
            "uri": f"postgresql://{user}:{password}@{netloc}:{port}/{dbname}?options=-csearch_path%3D{schema}",
            "port": port, "netloc": netloc, "password": password, "user": user, "dbname": dbname, "schema": schema
        }

    def output_table(self):
        return self.xml.xpath("//*/outputTables[1]/@fuzzyRecordLinkageTableName")[
            0
        ].lower()

    def pairs(self):
        pairs = {}
        for similarity in self.xml.xpath("//*/similarity"):

            similarity_name = similarity.attrib["similarityName"].lower()
            similarity_type = (
                {
                    "jaroWincklerSimilarityNames": "name",
                    "similarityBirthDate": "date",
                    "levenshteinSimilarityBirthPlaceCOG": "city",
                }
            ).get(similarity.attrib["similarityMethod"], "verbatim")
            cols = {}

            schema = pairs[similarity_name] = {"cols": cols, "type": similarity_type}

            for inputNode in similarity.iterchildren():
                tableName = inputNode.attrib["tableName"].lower()

                if similarity_type == "name":
                    schema["cols"][tableName] = [
                        f"{field_name}_{tableName}".lower()
                        for attr_name, field_name in inputNode.attrib.items()
                        if attr_name.startswith("name")
                    ]
                else:
                    fields = (
                        {
                            "date": ["day", "month", "year"],
                            "city": ["BirthPlaceCode", "BirthPlaceName"],
                        }
                    ).get(similarity_type, ["columnName"])

                    cols[tableName] = [
                        f"{field_name}_{tableName}".lower()
                        for attr_name, field_name in inputNode.attrib.items()
                        if attr_name in fields
                    ]

        return pairs

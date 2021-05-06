def test_upload(client, xml_apprenti):
    response = client.post("/upload_file/", {"xml": xml_apprenti})
    assert response.status_code == 200


def test_upload_bad_connection(client, fs):
    with fs.XML_WRONG_NETLOC.open() as f:
        response = client.post("/upload_file/", {"xml": f})
        assert response.status_code == 500

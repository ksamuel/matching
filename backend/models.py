from django.db import models


class DeppCustomCredential(models.Model):

    adressemail = models.TextField(editable=False, primary_key=True)
    motdepasse = models.TextField(editable=False)

    class Meta:
        db_table = "utilisateur"
        managed = False

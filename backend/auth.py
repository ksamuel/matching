"""
Custom auth backend to be able to reuse another project auth system

It still needs a local user object in the default db for the session,
but auth is checked against another database configured in AUTH_DB_URL.
"""

from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.models import User

from werkzeug.security import check_password_hash

from backend.models import DeppCustomCredential


class DeppAuthBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None):

        try:
            creds = DeppCustomCredential.objects.using("auth").get(adressemail=username)

        except (
            DeppCustomCredential.DoesNotExist,
            DeppCustomCredential.MultipleObjectsReturned,
        ):
            return None

        if not check_password_hash(creds.motdepasse, password):
            return None

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            user = User(username=username, is_staff=False, is_superuser=False)
            user.save()

        return user

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None

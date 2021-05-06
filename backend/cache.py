import datetime as dt
import json

from django_redis import get_redis_connection


def now_timestamp():
    return round(dt.datetime.now().timestamp() * 1000000)


def expiration_timestamp(days=30):
    return round((dt.datetime.now() + dt.timedelta(days=days)).timestamp() * 1000000)


class RedisClient:
    DATASOURCE_SCHEMA_KEY = "matching:datasources:{uid}:schema"
    DATASOURCE_LIST_KEY = "matching:datasources"

    def __init__(self):
        self.connexion = get_redis_connection("default")

    def set(self, key, member):
        self.connexion.set(key, json.dumps(member))

    def get(self, key):
        return json.loads(self.connexion.get(key))

    def save_datasource(self, uid, name, schema):
        self.set(
            self.DATASOURCE_SCHEMA_KEY.format(uid=uid), {"name": name, "schema": schema}
        )
        self.connexion.zadd(self.DATASOURCE_LIST_KEY, {uid: expiration_timestamp()})

    def load_datasource(self, uid):
        return self.get(self.DATASOURCE_SCHEMA_KEY.format(uid=uid))

    def list_datasources(self):
        return reversed(
            [
                uid.decode("ascii")
                for uid in self.connexion.zrangebyscore(
                self.DATASOURCE_LIST_KEY, now_timestamp(), float("+inf")
            )
            ]
        )

    def load_datasources(self):
        return [
            {"id": uid, "samples": [], **self.load_datasource(str(uid))}
            for uid in self.list_datasources()
        ]


redis = RedisClient()

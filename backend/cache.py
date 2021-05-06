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
    SAMPLE_PARAMS_KEY = "matching:samples:{uid}:params"
    SAMPLE_DATA_KEY = "matching:samples:{uid}:data"

    def __init__(self):
        self.connexion = get_redis_connection("default")

    def set(self, key, member):
        self.connexion.set(key, json.dumps(member))

    def get(self, key):
        return json.loads(self.connexion.get(key))

    def save_datasource(self, uid, datasource):
        self.set(self.DATASOURCE_SCHEMA_KEY.format(uid=uid), datasource)
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

    def save_sample(self, uid, count, min_score, max_score, data):
        self.set(
            self.SAMPLE_PARAMS_KEY.format(uid=uid),
            {"count": count, "min_score": min_score, "max_score": max_score},
        )
        data = (dict(row) for row in data)
        data = {row["id"]: json.dumps(row) for row in data}
        self.connexion.hmset(self.SAMPLE_DATA_KEY.format(uid=uid), data)

    def load_sample(self, uid):

        return [
            json.loads(row)
            for id, row in self.connexion.hgetall(self.SAMPLE_DATA_KEY.format(uid=uid)).items()
        ]


redis = RedisClient()

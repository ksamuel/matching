import datetime as dt
import json

from django_redis import get_redis_connection


def to_ms_timestamp(datetime):
    return round(datetime.timestamp() * 1000)


def now_timestamp():
    return to_ms_timestamp(dt.datetime.now())


def expiration_timestamp(days=30):
    return to_ms_timestamp(dt.datetime.now() + dt.timedelta(days=days))


def timestamp_to_iso(timestamp):
    return (
        dt.datetime.utcfromtimestamp(timestamp / 1000.0)
            .replace(tzinfo=dt.timezone.utc)
            .isoformat()
    )


class RedisClient:
    DATASOURCE_SCHEMA_KEY = "matching:datasources:{uid}:schema"
    DATASOURCE_LIST_KEY = "matching:datasources"
    SAMPLE_PARAMS_KEY = "matching:samples:{uid}:params"
    SAMPLE_DATA_KEY = "matching:samples:{uid}:data"
    DATASOURCE_SAMPLE_LIST_KEY = "matching:datasources:{uid}:samples"

    def __init__(self):
        self.connexion = get_redis_connection("default")

    def set(self, key, member, *args, **kwargs):
        self.connexion.set(key, json.dumps(member), *args, **kwargs)

    def get(self, key):
        return json.loads(self.connexion.get(key))

    def save_datasource(self, uid, datasource):
        expiration = expiration_timestamp()
        key = self.DATASOURCE_SCHEMA_KEY.format(uid=uid)
        self.set(key, datasource, px=expiration)
        self.connexion.zadd(self.DATASOURCE_LIST_KEY, {uid: expiration})

    def load_datasource(self, uid):
        source = self.get(self.DATASOURCE_SCHEMA_KEY.format(uid=uid))
        if source:
            source["samples"] = [
                self.load_sample_params(sample_id)
                for sample_id in self.list_datasource_samples(uid)
            ]
            source["id"] = uid
        return source

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
        return [self.load_datasource(str(uid)) for uid in self.list_datasources()]

    def save_sample(self, datasource_id, uid, count, min_score, max_score, data):
        expiration = expiration_timestamp()

        self.set(
            self.SAMPLE_PARAMS_KEY.format(uid=uid),
            {
                "id": uid,
                "datasource": datasource_id,
                "count": count,
                "minScore": min_score,
                "maxScore": max_score,
                "expireDate": timestamp_to_iso(expiration),
                "date": dt.datetime.now().isoformat(),
            },
            px=expiration,
        )

        data = (dict(row) for row in data)
        data = {row["id"]: json.dumps(row) for row in data}

        key = self.SAMPLE_DATA_KEY.format(uid=uid)
        self.connexion.hmset(key, data)
        self.connexion.pexpire(key, expiration)

        self.connexion.zadd(
            self.DATASOURCE_SAMPLE_LIST_KEY.format(uid=datasource_id), {uid: expiration}
        )

        self.extend_datasource_expiration(datasource_id)

    def load_sample(self, uid):
        return [
            json.loads(row)
            for id, row in self.connexion.hgetall(
                self.SAMPLE_DATA_KEY.format(uid=uid)
            ).items()
        ]

    def list_datasource_samples(self, datasource_id):
        return reversed(
            [
                uid.decode("ascii")
                for uid in self.connexion.zrangebyscore(
                self.DATASOURCE_SAMPLE_LIST_KEY.format(uid=datasource_id),
                now_timestamp(),
                float("+inf"),
            )
            ]
        )

    def load_sample_params(self, uid):
        return json.loads(self.connexion.get(self.SAMPLE_PARAMS_KEY.format(uid=uid)))

    def extend_datasource_expiration(self, uid):
        expiration = expiration_timestamp()
        self.connexion.zadd(self.DATASOURCE_LIST_KEY, {uid: expiration})
        self.connexion.pexpire(self.DATASOURCE_SCHEMA_KEY.format(uid=uid), expiration)

    def extend_sample_expiration(self, uid):
        expiration = expiration_timestamp()
        self.connexion.zadd(
            self.DATASOURCE_SAMPLE_LIST_KEY.format(uid=uid), {uid: expiration}
        )
        self.connexion.pexpire(self.SAMPLE_DATA_KEY.format(uid=uid), expiration)
        self.connexion.pexpire(self.SAMPLE_PARAMS_KEY.format(uid=uid), expiration)

        params = self.load_sample_params(uid)
        self.extend_datasource_expiration(params["datasource"])

        params["expiration"] = timestamp_to_iso(expiration)
        self.set(self.SAMPLE_PARAMS_KEY.format(uid=uid), params)


redis = RedisClient()

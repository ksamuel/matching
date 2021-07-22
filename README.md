## Install in prod

Make sure you have python 3.6+ and poetry installed, then:

```bash
git clone https://github.com/ksamuel/matching.git matching
cd matching
poetry install --no-dev
```


Then ensure your init system runs this:

```
/path/to/the/project/env/bin/gunicorn project.wsgi -b 127.0.0.1:8000  --workers 4
```

But do not stats the service yet.

At boot. It should also pass the following environment variables:

- INSERJEUNES_DB_PWD: put here the database password that has been removed from the XML
- AUTH_DB_URL: a POSTGRESQL connection URI, in the format `postgres://USER:PASSWORD@HOST:PORT/NAME?currentSchema=SCHEMA_NAME`. It should point to the database containing the table `utilisateur` matching the `models.DeppCustomCredential` layout.
- REDIS_URL: put here the url to connect to the redis instance
- DEBUG: this should be false in production. Default is false.
- SECRET_KEY: put here a randomly generated secret key used for session management
- ALLOWED_HOST: the IP of the server or the domain name to access the website Example values for env vars:
- URL_PREFIX: a piece of URL path to prepend to all path in the application. This must match you apache/nginx routing and will set the HTML `<base>` tag.
- LOG_LEVEL: between "debug", "info", "warning", "error" and "critical". Default is "warning".
- CORS_ALLOWED_ORIGINS: a coma separated list of domains to allow CORS from (optional)

E.G:

```init
AUTH_DB_URL=postgresql://my_user:my_password@localhost:5432/my_db?currentSchema=my_schema
INSERJEUNES_DB_PWD=fj789hfdsUB6FFd
REDIS_URL=redis://127.0.0.1:6379/0
SECRET_KEY=#2t!6-q@)!lxa@bupm%4*e5bn-1q&$rwg#+q&9o!o4mormm=-b
DEBUG=false
ALLOWED_HOST=183.12.12.34
URL_PREFIX=/matching/
LOG_LEVEL="error"
CORS_ALLOWED_ORIGINS=http://183.12.12.34:8000,http://183.12.12.34:3000
```

Use a new secret key for each prod, generate one from https://djecrety.ir/ but remove any "%" since systemd interprets
them.

Now, run the database migration at the root project directory (the one containing the `manage.py` file)

```
poetry run python manage.py migrate
```

This will create a local sqlite database file containing the authentification sessions data.

Now, you can start the service, and ensure your web server is doing a proxy pass to `127.0.0.1:8000`, and set the root directory to "
/path/to/the/project/frontend/dist".

Logs are written to stderr, your infrastructure should capture that and redirect it to your logging facility (automatic with systemd).


## Setup dev

Make sure you have python 3.6+ and peotry, then run the backend:

```bash
git clone https://github.com/ksamuel/matching.git matching
cd matching
poetry install
poetry run manage.py runserver
```

Make sure you have nodejs 12+, and in another terminal run the frontend:

```bash
cd frontend
npm install --include=dev
npm run dev
```

To build the project:

```bash
npm run build # outputs in frontend/dist
```

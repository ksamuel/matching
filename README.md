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

At boot. It should also pass the following environment variables:

- INSERJEUNES_DB_PWD: put here the database password that has been removed from the XML
- REDIS_URL: put here the url to connect to the redis instance
- DEBUG: this should be false in production. Default is false.
- SECRET_KEY: put here a randomly generated secret key used for session management
- ALLOWED_HOST: the IP of the server or the domain name to access the website Example values for env vars:
- BASE_URL: the absolute url root to serve the site with. This must match you apache/nginx config and well set the HTML
  base tag.
- LOG_LEVEL: between "debug", "info", "warning", "error" and "critical". Default is "warning".

E.G:

```init
INSERJEUNES_DB_PWD=fj789hfdsUB6FFd
REDIS_URL=redis://127.0.0.1:6379/0
SECRET_KEY=#2t!6-q@)!lxa@bupm%4*e5bn-1q&$rwg#+q&9o!o4mormm=-b
DEBUG=false
ALLOWED_HOST=183.12.12.34
BASE_URL=http://183.12.12.34:8989/matching/
LOG_LEVEL="error"
```

Use a new secret key for each prod, generate one from https://djecrety.ir/ but remove any "%" since systemd interprets
them.

Start the service, and ensure your web server is doing a proxy pass to `127.0.0.1:8000`, and set the root directory to "
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

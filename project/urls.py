"""repo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import urllib.parse

from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, re_path
from django.views.generic import TemplateView

from backend.views import (
    upload_file,
    datasource_list,
    score_boundaries,
    datasource,
    get_sample_data,
    create_sample,
    get_sample_params,
    update_pair_status,
)

URL_PREFIX = urllib.parse.urlparse(settings.BASE_URL).path.strip("/")
if URL_PREFIX:
    URL_PREFIX += "/"

frontend_urls = [
    URL_PREFIX + "",
    URL_PREFIX + "index.html",
    URL_PREFIX + "datasources/<datasourceId>/samples/<sampleId>/",
    URL_PREFIX + "datasources/<datasourceId>/",
    URL_PREFIX + "nodatasource/",
    URL_PREFIX + "nosample/",
]

urlpatterns = (
    [
        # path("admin/", admin.site.urls),
        re_path(
            URL_PREFIX
            + "api/v1/samples/(?P<sample_id>[0-9a-f-]{36})/pairs/(?P<pair_id>[0-9A-Z]+)/status",
            update_pair_status,
        ),
        re_path(
            URL_PREFIX + "api/v1/samples/(?P<sample_id>[0-9a-f-]{36})/data/",
            get_sample_data,
        ),
        re_path(
            URL_PREFIX + "api/v1/samples/(?P<sample_id>[0-9a-f-]{36})/params/",
            get_sample_params,
        ),
        re_path(
            URL_PREFIX
            + "api/v1/datasources/(?P<datasource_id>[0-9a-f]{64})/scoreboundaries/",
            score_boundaries,
        ),
        re_path(
            URL_PREFIX + "api/v1/datasources/(?P<datasource_id>[0-9a-f]{64})/samples/",
            create_sample,
        ),
        re_path(
            URL_PREFIX + "api/v1/datasources/(?P<datasource_id>[0-9a-f]{64})/",
            datasource,
        ),
        path(URL_PREFIX + "api/v1/datasources/", datasource_list),
        path(URL_PREFIX + "upload_file/", upload_file),
    ]
    + static(
        URL_PREFIX.rstrip("/") + "/assets/",
        document_root=settings.FRONTEND_DIR / "assets",
    )
    + [
        path(
            url,
            TemplateView.as_view(
                template_name="index.html",
                extra_context={"BASE_URL": settings.BASE_URL},
            ),
        )
        for url in frontend_urls
    ]
)

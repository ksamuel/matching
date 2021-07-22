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

from django.contrib.auth.decorators import login_required
from django.conf import settings

from django.urls import path, re_path
from django.views.generic import TemplateView
from django.contrib import admin
from django.views.static import serve

from backend.views import (
    upload_file,
    datasource_list,
    score_boundaries,
    datasource,
    get_sample_data,
    create_sample,
    get_sample_params,
    update_pair_status,
    sign_in_user,
    sign_out_user,
)

frontend_urls = [
    "",
    "datasources/<datasourceId>/samples/<sampleId>/",
    "datasources/<datasourceId>/",
    "nodatasource/",
    "nosample/",
    "login/",
]

urlpatterns = [
    path("admin/", admin.site.urls),
    re_path(
        "api/v1/samples/(?P<sample_id>[0-9a-f-]{36})/pairs/(?P<pair_id>[0-9A-Z]+)/status/",
        update_pair_status,
    ),
    re_path("api/v1/samples/(?P<sample_id>[0-9a-f-]{36})/data/", get_sample_data),
    re_path("api/v1/samples/(?P<sample_id>[0-9a-f-]{36})/params/", get_sample_params),
    re_path(
        "api/v1/datasources/(?P<datasource_id>[0-9a-f]{64})/scoreboundaries/",
        score_boundaries,
    ),
    re_path(
        "api/v1/datasources/(?P<datasource_id>[0-9a-f]{64})/samples/", create_sample
    ),
    re_path("api/v1/datasources/(?P<datasource_id>[0-9a-f]{64})/", datasource),
    path("api/v1/datasources/", datasource_list),
    path("api/v1/login/", sign_in_user),
    path("api/v1/logout/", sign_out_user),
    path("upload_file/", upload_file),
    # This serves static files as if they would be in production by nginx or Apache
    # You can use it to test your app with debug=True, but in production
    # you should cover those url patterns using nginx or apache and not serve
    # that with Django
    re_path(
        r"assets/(?P<path>.*)$",
        serve,
        {"document_root": settings.FRONTEND_DIR / "assets"},
    ),
] + [
    path(
        url,
        TemplateView.as_view(
            template_name="index.html",
            extra_context={"URL_PREFIX": settings.URL_PREFIX},
        ),
    )
    for url in frontend_urls
]


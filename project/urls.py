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
from django.contrib import admin
from django.urls import path, re_path

from backend.views import (
    upload_file,
    sample,
    datasource_list,
    score_boundaries,
    datasource,
    get_sample_data,
    create_sample,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/sample/<int:sample_id>/", sample),
    re_path("api/v1/samples/(?P<sample_id>[0-9a-f-]{36})/data/", get_sample_data),
    re_path(
        "api/v1/datasources/(?P<datasource_id>[0-9a-f]{64})/scoreboundaries/",
        score_boundaries,
    ),
    re_path(
        "api/v1/datasources/(?P<datasource_id>[0-9a-f]{64})/samples/", create_sample
    ),
    re_path("api/v1/datasources/(?P<datasource_id>[0-9a-f]{64})/", datasource),
    path("api/v1/datasources/", datasource_list),
    path("upload_file/", upload_file),
]

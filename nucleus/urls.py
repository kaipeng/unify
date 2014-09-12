
from django.conf.urls import patterns, url


urlpatterns = patterns("nucleus.views",
    url("^dashboard/$", "dashboard", name="dashboard"),
)


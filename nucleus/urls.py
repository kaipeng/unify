
from django.conf.urls import patterns, url
from .views import DashboardView

urlpatterns = patterns("nucleus.views",
    url("^dashboard/$", DashboardView.as_view(), name="dashboard_ember"),
)


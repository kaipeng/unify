from django.conf.urls import include, url, include
from django.contrib import admin

urlpatterns = [
    # Examples:
    # url(r'^$', 'unify.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    # url("", include('django_socketio.urls')),
    url(r'^admin/', include(admin.site.urls)),
    #url("", include("chat.urls")),
    url("", include("nucleus.urls")),

]

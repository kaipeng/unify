'''
from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import get_object_or_404, render, redirect
from django_socketio import broadcast, broadcast_channel, NoSocket



def dashboard(request, template="dashboard_ember.html"):
    """
    Homepage - lists all rooms.
    """
    return render(request, template, None)
'''


# -*- coding: utf-8 -*-
from django.contrib.auth.models import User, Group
from django.http import HttpResponse
from django.views.generic.base import TemplateView
from django.views.decorators.csrf import csrf_exempt
from ws4redis.redis_store import RedisMessage
from ws4redis.publisher import RedisPublisher

from django.conf import settings

class DashboardView(TemplateView):
    template_name = 'dashboard_ember.html'

    def get(self, request, *args, **kwargs):
        return super(DashboardView, self).get(request, *args, **kwargs)

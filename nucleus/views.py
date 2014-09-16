
from django.contrib.auth.decorators import user_passes_test
from django.shortcuts import get_object_or_404, render, redirect
from django_socketio import broadcast, broadcast_channel, NoSocket



def dashboard(request, template="dashboard.html"):
    """
    Homepage - lists all rooms.
    """
    return render(request, template, None)

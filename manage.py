#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    print "Starting ze App!!"


    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "unify.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)

#$ python manage.py runserver_socketio host:port
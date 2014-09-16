#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    print "Manage.py: Starting ze App!!"
    import os
    print(os.getpid())

    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "unify.settings")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)


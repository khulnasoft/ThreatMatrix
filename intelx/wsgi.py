# This file is a part of IntelX https://github.com/khulnasoft/IntelX
# See the file 'LICENSE' for copying permission.

# This file is a part of IntelX https://github.com/khulnasoft/IntelX
# See the file 'LICENSE' for copying permission.

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "intelx.settings")

application = get_wsgi_application()

# This file is a part of IntelX https://github.com/khulnasoft/IntelX
# See the file 'LICENSE' for copying permission.
from logging import getLogger

from django.apps import AppConfig

logger = getLogger(__name__)


class ApiAppConfig(AppConfig):
    name = "api_app"

    def ready(self):  # skipcq: PYL-R0201
        from . import signals  # noqa

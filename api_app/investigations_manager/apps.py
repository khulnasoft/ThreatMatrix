# This file is a part of IntelX https://github.com/khulnasoft/IntelX
# See the file 'LICENSE' for copying permission.

from django.apps import AppConfig


class InvestigationManagerConfig(AppConfig):
    name = "api_app.investigations_manager"

    @staticmethod
    def ready() -> None:
        from . import signals  # noqa

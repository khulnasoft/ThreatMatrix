# This file is a part of IntelX https://github.com/khulnasoft/IntelX
# See the file 'LICENSE' for copying permission.

from django.apps import AppConfig


class VisualizersManagerConfig(AppConfig):
    name = "api_app.visualizers_manager"

    @staticmethod
    def ready() -> None:
        from . import signals  # noqa

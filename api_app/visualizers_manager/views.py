# This file is a part of IntelX https://github.com/khulnasoft/IntelX
# See the file 'LICENSE' for copying permission.

import logging

from api_app.views import PythonConfigViewSet, PythonReportActionViewSet
from api_app.visualizers_manager.models import VisualizerReport
from api_app.visualizers_manager.serializers import VisualizerConfigSerializer

logger = logging.getLogger(__name__)


__all__ = [
    "VisualizerConfigViewSet",
]


class VisualizerConfigViewSet(PythonConfigViewSet):
    serializer_class = VisualizerConfigSerializer


class VisualizerActionViewSet(PythonReportActionViewSet):
    @classmethod
    @property
    def report_model(cls):
        return VisualizerReport

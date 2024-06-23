# This file is a part of IntelX https://github.com/khulnasoft/IntelX
# See the file 'LICENSE' for copying permission.

from django.urls import include, path
from rest_framework import routers

# Routers provide an easy way of automatically determining the URL conf.
from api_app.pivots_manager.views import PivotConfigViewSet, PivotMapViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register(r"pivot", PivotConfigViewSet, basename="pivot")
router.register(r"pivot_map", PivotMapViewSet, basename="pivot_map")

urlpatterns = [
    path(r"", include(router.urls)),
]

"""
URL Configuration for the 'avisos' app.

This module defines the URL patterns for the 'avisos' API endpoints.
It uses a DefaultRouter to automatically generate the routes for the AvisoViewSet.
"""
from rest_framework.routers import DefaultRouter
from .views import AvisoViewSet

router = DefaultRouter()
router.register(r'avisos', AvisoViewSet, basename='aviso')

urlpatterns = router.urls
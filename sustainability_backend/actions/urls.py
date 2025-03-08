from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ActionViewSet

router = DefaultRouter()
router.register(r'actions', ActionViewSet, basename='action')

urlpatterns = [
    path('', include(router.urls)),
]
from rest_framework.routers import DefaultRouter
from .views import (FormsViewSet, UsersViewSet)
from django.urls import path, include

router = DefaultRouter()
router.register(r'api/forms', FormsViewSet)
router.register(r'api/users', UsersViewSet)
router.register(r'api', UsersViewSet)

urlpatterns = [path("", include(router.urls)), ]

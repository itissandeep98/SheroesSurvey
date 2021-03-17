from rest_framework import routers
from .api import FormsViewSet, UsersViewSet
from django.urls import path, include

router = routers.DefaultRouter()
router.register('api/forms', FormsViewSet, 'Forms')
router.register('api/users', UsersViewSet, 'Users')
router.register('api/', UsersViewSet, 'Forms')

urlpatterns = [path("", include(router.urls)), ]

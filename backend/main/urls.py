from rest_framework.routers import DefaultRouter
from .views import FormsViewSet, UsersViewSet, SectionsViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'forms', FormsViewSet)
router.register(r'users', UsersViewSet)
router.register(r'sections', SectionsViewSet)
# router.register(r'', UsersViewSet)

urlpatterns = [path("", include(router.urls)), ]

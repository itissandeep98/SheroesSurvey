from rest_framework import routers
from .api import FormsViewSet, UsersViewSet

router = routers.DefaultRouter()
router.register('api/forms', FormsViewSet, 'Forms')
router.register('api/users', UsersViewSet, 'Users')
router.register('api/', UsersViewSet, 'Forms')

urlpatterns = router.urls
from rest_framework.routers import DefaultRouter
from .views import FormsViewSet, UsersViewSet, SectionsViewSet, QuestionsViewSet, OptionsViewSet, ShortParaViewSet, ResponsesViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'forms', FormsViewSet)
router.register(r'users', UsersViewSet)
router.register(r'sections', SectionsViewSet)
router.register(r'questions', QuestionsViewSet)
router.register(r'options', OptionsViewSet)
router.register(r'shortparas', ShortParaViewSet)
router.register(r'responses', ResponsesViewSet)
# router.register(r'', UsersViewSet)


urlpatterns = [path("", include(router.urls)), ]

from rest_framework.routers import DefaultRouter
from .views import FormsViewSet, SectionsViewSet, QuestionsViewSet, OptionsViewSet, ShortParaViewSet, ResponsesViewSet
from django.urls import path, include

router = DefaultRouter()
router.register(r'forms', FormsViewSet, basename='Forms')
router.register(r'sections', SectionsViewSet)
router.register(r'questions', QuestionsViewSet)
router.register(r'options', OptionsViewSet)
router.register(r'shortparas', ShortParaViewSet)
router.register(r'responses', ResponsesViewSet)
# router.register(r'', OurUsersViewSet)


urlpatterns = [path("", include(router.urls)), ]

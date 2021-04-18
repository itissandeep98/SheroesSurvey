from django.urls import path, include
from .views import RegisterAPI
from knox import views as knox_views

urlpatterns = [
    path('auth', include('knox.urls')),
    path('auth/register', RegisterAPI.as_view())
]
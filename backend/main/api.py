from main.models import Forms, Users
from rest_framework import viewsets, permissions
from .serializers import FormSerializers, UserSerializers

class FormsViewSet(viewsets.ModelViewSet):
    queryset = Forms.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FormSerializers

class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializers
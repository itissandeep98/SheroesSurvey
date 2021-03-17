from main.models import Forms, Users
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from .serializers import FormSerializers, UserSerializers
from rest_framework.response import Response


class FormsViewSet(viewsets.ModelViewSet):
    queryset = Forms.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FormSerializers

    @action(methods=['post'], detail=True)
    def update_section_sequence(self, request, pk=None):
        try:
            if(pk == None):
                raise Exception()
            form_id = pk
            updated_section_sequence = request.data["section_sequence"]
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)
        form_instance = Forms.objects.get(id=form_id)
        form_instance.section_sequence = updated_section_sequence
        form_instance.save()

        # Teacher.objects.filter(pk=pk).update(voting=F('voting') + 1)
        return Response("Update Accepted", status=status.HTTP_200_OK)


class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializers

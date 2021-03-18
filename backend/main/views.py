from main.models import Forms, Users, Sections, Questions, Options, ShortPara
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from .serializers import FormSerializers, UserSerializers, SectionSerializers, QuestionSerializers, OptionsSerializers, ShortParaSerializers
from rest_framework.response import Response


class FormsViewSet(viewsets.ModelViewSet):
    queryset = Forms.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = FormSerializers

    @action(methods=['patch','post'], detail=True)
    def update_section_sequence(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/forms/<form-id>/update_section_sequence/
            url: http://127.0.0.1:8000/forms/<form-id>/update_section_sequence/
            {
                "updated_by": 4,
                "section_sequence" : [1,3,2]
            }
        """
        try:
            if(pk == None):
                raise Exception()
            form_id = pk
            updated_by_new=request.data["updated_by"]
            updated_section_sequence = request.data["section_sequence"]
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)
        form_instance = Forms.objects.get(id=form_id)
        form_instance.section_sequence=updated_section_sequence
        form_instance.updated_by=Users.objects.get(id=updated_by_new)
        form_instance.save()

        # Teacher.objects.filter(pk=pk).update(voting=F('voting') + 1)
        return Response("Update Accepted", status=status.HTTP_200_OK)


class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializers

class SectionsViewSet(viewsets.ModelViewSet):
    queryset = Sections.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SectionSerializers

    @action(methods=['patch', 'post'], detail=True)
    def update_question_sequence(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/forms/<section-id>/update_question_sequence/
            url: http://127.0.0.1:8000/sections/<section-id>/update_question_sequence/
            {
                "updated_by": 4,
                "question_sequence" : [1,2]
            }
        """
        try:
            if(pk == None):
                raise Exception()
            section_id = pk
            updated_by_new=request.data["updated_by"]
            updated_question_sequence = request.data["question_sequence"]
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)
        section_instance = Sections.objects.get(id=section_id)
        section_instance.question_sequence=updated_question_sequence
        section_instance.updated_by=Users.objects.get(id=updated_by_new)
        section_instance.save()

        # Teacher.objects.filter(pk=pk).update(voting=F('voting') + 1)
        return Response("Update Accepted", status=status.HTTP_200_OK)

class QuestionsViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializers


class ShortParaViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ShortParaSerializers

class OptionsViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = OptionsSerializers

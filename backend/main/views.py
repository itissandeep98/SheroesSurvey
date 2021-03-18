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

    # @action(methods=['patch','post'], detail=True)
    # def update_section_sequence(self, request, pk=None):
    #     """
    #     Format:
    #         url: https://sheroes-form.herokuapp.com/forms/<form-id>/update_section_sequence/
    #         url: http://127.0.0.1:8000/forms/<form-id>/update_section_sequence/
    #         {
    #             "updated_by": 4,
    #             "section_sequence" : [1,3,2]
    #         }
    #     """
    #     try:
    #         if(pk == None):
    #             raise Exception()
    #         form_id = pk
    #         updated_by_new=request.data["updated_by"]
    #         updated_section_sequence = request.data["section_sequence"]
    #     except:
    #         return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)
    #     form_instance = Forms.objects.get(id=form_id)
    #     form_instance.section_sequence=updated_section_sequence
    #     form_instance.updated_by=Users.objects.get(id=updated_by_new)
    #     form_instance.save()

    #     # Teacher.objects.filter(pk=pk).update(voting=F('voting') + 1)
    #     return Response("Update Accepted", status=status.HTTP_200_OK)

    @action(methods=['patch','post'], detail=True)
    def update_fields(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/forms/<form-id>/update_fields/
            url: http://127.0.0.1:8000/forms/<form-id>/update_fields/
            {
                "fields": ["updated_by" , "section_sequence" , "description"]
                "updated_by": 4,
                "section_sequence" : [1,3,2]
                "description" : "This is a sample description"
            }
        """
        try:
            if(pk == None):
                raise Exception()
            form_id = pk
            form_instance = Forms.objects.get(id=form_id)
            for field in request.data["fields"]:
                if field=="updated_by":      #special conditions for foreign key
                    setattr(form_instance,field,Users.objects.get(id=request.data[field]))
                elif field=="created_by":   #Cannot update created by
                    pass
                else:
                    setattr(form_instance,field,request.data[field])
            form_instance.save()
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)


class UsersViewSet(viewsets.ModelViewSet):
    queryset = Users.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializers

    @action(methods=['patch','post'], detail=True)
    def update_fields(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/forms/<user-id>/update_fields/
            url: http://127.0.0.1:8000/forms/<user-id>/update_fields/
            {
                "fields": ["first_name" , "partner_id" , "user_type"]
                "first_name": "Bond",
                "partner_id" : "007"
                "user_type" : "CR"
            }
        """
        try:
            if(pk == None):
                raise Exception()
            user_id = pk
            user_instance = Users.objects.get(id=user_id)
            for field in request.data["fields"]:
                setattr(user_instance,field,request.data[field])
            user_instance.save()
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)


class SectionsViewSet(viewsets.ModelViewSet):
    queryset = Sections.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = SectionSerializers

    @action(methods=['patch','post'], detail=True)
    def update_fields(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/forms/<section-id>/update_fields/
            url: http://127.0.0.1:8000/forms/<form-id>/section_fields/
            {
                "fields": ["updated_by" , "question_sequence" , "description"]
                "updated_by": 4,
                "question_sequence" : [1,3,2]
                "description" : "This is a sample description"
            }
        """
        try:
            if(pk == None):
                raise Exception()
            section_id = pk
            section_instance = Sections.objects.get(id=section_id)
            for field in request.data["fields"]:
                if field=="updated_by":     #special conditions for foreign key
                    setattr(section_instance,field,Users.objects.get(id=request.data[field]))
                elif field=="form_id":      #special conditions for foreign key
                    setattr(section_instance,field,Forms.objects.get(id=request.data[field]))
                elif field=="created_by":   #Cannot update created by
                    pass
                else:
                    setattr(section_instance,field,request.data[field])
            section_instance.save()
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)


class QuestionsViewSet(viewsets.ModelViewSet):
    queryset = Questions.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializers

    @action(methods=['patch','post'], detail=True)
    def update_fields(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/forms/<question-id>/update_fields/
            url: http://127.0.0.1:8000/forms/<question-id>/section_fields/
            {
                "fields": ["updated_by" , "statement", "section_id"]
                "updated_by": 4,
                "statement" : "This is a sample question statement",
                "section_id" : 5
            }
        """
        try:
            if(pk == None):
                raise Exception()
            question_id = pk
            question_instance = Questions.objects.get(id=question_id)
            for field in request.data["fields"]:
                if field=="updated_by":     #special conditions for foreign key
                    setattr(question_instance,field,Users.objects.get(id=request.data[field]))
                elif field=="section_id":      #special conditions for foreign key
                    setattr(question_instance,field,Sections.objects.get(id=request.data[field]))
                elif field=="created_by":   #Cannot update created by
                    pass
                else:
                    setattr(question_instance,field,request.data[field])
            question_instance.save()
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)


class ShortParaViewSet(viewsets.ModelViewSet):
    queryset = ShortPara.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ShortParaSerializers

    @action(methods=['patch','post'], detail=True)
    def update_fields(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/forms/<shortpara-id>/update_fields/
            url: http://127.0.0.1:8000/forms/<shortpara-id>/section_fields/
            {
                "fields": ["limit_length" , "datatype"]
                "limit_length": 4,
                "datatype" : "FLT",
            }
        """
        try:
            if(pk == None):
                raise Exception()
            shortpara_id = pk
            shortpara_instance = ShortPara.objects.get(id=shortpara_id)
            for field in request.data["fields"]:
                if field=="question_id":   #Changing question id after creating is not sensible
                    pass
                else:
                    setattr(shortpara_instance,field,request.data[field])
            shortpara_instance.save()
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)


class OptionsViewSet(viewsets.ModelViewSet):
    queryset = Options.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = OptionsSerializers

    @action(methods=['patch','post'], detail=True)
    def update_fields(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/forms/<option-id>/update_fields/
            url: http://127.0.0.1:8000/forms/<option-id>/section_fields/
            {
                "fields": ["content" , "image_toggle", "correct_answer]
                "content": "Yo, this ma option",
                "image_toggle" : false,
                "correct_answer" : true
            }
        """
        try:
            if(pk == None):
                raise Exception()
            option_id = pk
            option_instance = Options.objects.get(id=option_id)
            for field in request.data["fields"]:
                if field=="question_id":   #Changing question id after creating is not sensible
                    pass
                else:
                    setattr(option_instance,field,request.data[field])
            option_instance.save()
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)
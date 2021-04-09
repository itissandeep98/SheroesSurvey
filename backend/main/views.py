from main.models import Forms, Users, Sections, Questions, Options, ShortPara, Responses
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from .serializers import FormSerializers, UserSerializers, SectionSerializers, QuestionSerializers, OptionsSerializers, ShortParaSerializers, ResponsesSerializers
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
            for field in request.data:

                if field=="updated_by":      #special conditions for foreign key
                    setattr(form_instance,field,Users.objects.get(id=request.data[field]))
                elif field=="created_by" or field == "created_on":   #Cannot update created by
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
            url: https://sheroes-form.herokuapp.com/users/<user-id>/update_fields/
            url: http://127.0.0.1:8000/users/<user-id>/update_fields/
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
            for field in request.data:
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
            url: https://sheroes-form.herokuapp.com/sections/<section-id>/update_fields/
            url: http://127.0.0.1:8000/sections/<section-id>/section_fields/
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
            for field in request.data:
                if field=="updated_by":     #special conditions for foreign key
                    setattr(section_instance,field,Users.objects.get(id=request.data[field]))
                elif field=="form_id":      #special conditions for foreign key
                    setattr(section_instance,field,Forms.objects.get(id=request.data[field]))
                elif field=="created_by" or field == "created_on":   #Cannot update created by
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
    serializer_class = QuestionSerializers

    @action(methods=['patch','post'], detail=True)
    def update_fields(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/questions/<question-id>/update_fields/
            url: http://127.0.0.1:8000/questions/<question-id>/section_fields/
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
            for field in request.data:
                if field=="updated_by":     #special conditions for foreign key
                    setattr(question_instance,field,Users.objects.get(id=request.data[field]))
                elif field=="section_id":      #special conditions for foreign key
                    setattr(question_instance,field,Sections.objects.get(id=request.data[field]))
                elif field=="created_by" or field == "created_on":   #Cannot update created by
                    pass
                else:
                    setattr(question_instance,field,request.data[field])
            question_instance.save()
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)

    @action(methods=['get'], detail=True)
    def get_options(self, request, pk=None):
        """
        Returns all the options related the this MCQ 
        Format:
            url: https://sheroes-form.herokuapp.com/questions/<question-id>/get_options/
            url: http://127.0.0.1:8000/questions/<question-id>/get_options/
        """
        # print(Questions.objects.get(id=pk).qtype)
        try:
            this_question=Questions.objects.get(id=pk)
        except:
            return Response("Question does not exists", status=status.HTTP_400_BAD_REQUEST)
            
        if(Questions.objects.get(id=pk).qtype == Questions.QuestionType.MULTIPLE):
            all_=Options.objects.all().filter(question_id=this_question)
        else:
            return Response("Not a MCQ", status=status.HTTP_400_BAD_REQUEST)    
        
        return Response(all_.values(), status=status.HTTP_200_OK)


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
            url: https://sheroes-form.herokuapp.com/shortparas/<shortpara-id>/update_fields/
            url: http://127.0.0.1:8000/shortparas/<shortpara-id>/section_fields/
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
            for field in request.data:
                if field=="question_id":   #Changing question id after creating is not sensible
                    pass
                else:
                    setattr(shortpara_instance,field,request.data[field])
            shortpara_instance.save()
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)


class OptionsViewSet(viewsets.ModelViewSet):
    """
    Posting a new option for a MCQ question,
    Format:
        heroku url: https://sheroes-form.herokuapp.com/options/
        local url:  http://127.0.0.1:8000/options/
        {
            "question_id" : <question_id>,
            "content": <content of the ption>,
            "image_toggle" : <if option is an image>,
            "correct_answer" : <whether it is the correct answer>   
        }
    """
    queryset = Options.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = OptionsSerializers

    @action(methods=['patch','post'], detail=True)
    def update_fields(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/options/<option-id>/update_fields/
            url: http://127.0.0.1:8000/options/<option-id>/section_fields/
            {
                "content": "Yo, this is my option",
                "image_toggle" : false,
                "correct_answer" : true
            }
        """
        try:
            if(pk == None):
                raise Exception()

            option_id = pk
            option_instance = Options.objects.get(id=option_id)
            for field in request.data:
                if field=="question_id":   #Changing question id after creating is not sensible
                    pass
                else:
                    setattr(option_instance,field,request.data[field])
            option_instance.save()
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)

   
class ResponsesViewSet(viewsets.ModelViewSet):
    queryset = Responses.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ResponsesSerializers

    @action(methods=['patch','post'], detail=True)
    def update_fields(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/responses/<response-id>/update_fields/
            url: http://127.0.0.1:8000/responses/<response-id>/section_fields/
            {
                "fields": ["is_deleted" , "response"]
                "is_deleted": false,
                "response" : {"MC" : [<optionid_1>, <optionid_2>]}
            }

            OR

            {
                "fields": ["is_deleted" , "response"]
                "is_deleted": false,
                "response" : {"SP" : <shortparaid_1>}
            }

            OR

            {
                "fields": ["is_deleted" , "response"]
                "is_deleted": false,
                "response" : {"LP" : "This is a sample long para response" }
            }
        """
        try:
            if(pk == None):
                raise Exception()
            response_id = pk
            response_instance = Responses.objects.get(id=response_id)
            for field in request.data:
                if field=="question_id" or field=="user_id" or field=="form_id" or field=="created_on":   #Changing question id after creating is not sensible
                    pass
                else:
                    setattr(response_instance,field,request.data[field])
            response_instance.save()
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)
from main.models import Forms, OurUsers, Sections, Questions, Options, ShortPara, Responses, FileUpload
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from .serializers import FormSerializers, SectionSerializers, QuestionSerializers, OptionsSerializers, ShortParaSerializers, ResponsesSerializers, FileUploadSerializers
from rest_framework.response import Response
from django.contrib.auth.models import AnonymousUser


class FormsViewSet(viewsets.ModelViewSet):
    # permission_classes = [
    #     permissions.AllowAny
    # ]

    def get_permissions(self):
        print(self.action)
        if self.action in ['update', 'partial_update', 'destroy', 'create']:
            self.permission_classes = [permissions.IsAuthenticated, ]
        elif self.action in ['list','accept_response']:
            self.permission_classes = [permissions.AllowAny, ]
        # elif self.action in ['accept_response']:
        return super().get_permissions()
            
    serializer_class = FormSerializers


    def get_queryset(self, username=None):
        if isinstance(self.request.user,AnonymousUser):
            return Forms.objects.all()
        if self.request.user.user_type=='AD':
            return Forms.objects.all()
        elif self.request.user.user_type=='CR':
            return self.request.user.form_created_by.all()
        else:
            return None
 
        

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
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
                    setattr(form_instance,field,OurUsers.objects.get(id=request.data[field]))
                elif field=="created_by" or field == "created_on":   #Cannot update created by
                    pass
                
                else:
                    setattr(form_instance,field,request.data[field])
            form_instance.save()
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def get_all_not_del(self,request):
        """
        Returns all the forms which are not deleted.
        By deleted it means that they are not soft deleted.
        This should be used via GET request.
        Format:
            heroku url: https://sheroes-form.herokuapp.com/forms/get_all_not_del/
            local url:  http://127.0.0.1:8000/forms/get_all_not_del/
            ********************
            Note: If you want to access a particular form, use the default GET request.
            Example : If user wants to access form number 37 use the following url
            https://sheroes-form.herokuapp.com/forms/37/
        """
        return Response(Forms.objects.all().filter(is_deleted = False).values(),status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def get_all_deleted_forms(self,request):
        """
        Returns all the forms which were soft deleted  by using GET request.
        This should be used via GET request.
        Format:
            heroku url: https://sheroes-form.herokuapp.com/forms/get_all_deleted_forms/
            local url:  http://127.0.0.1:8000/forms/get_all_deleted_forms/
        """
        return Response(Forms.objects.all().filter(is_deleted = True).values(),status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def accept_response(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/forms/<form-id>/accept_response/
            url: http://127.0.0.1:8000/forms/<form-id>/accept_response/
            Dictionary to be sent :
            user_id 
            form_id 
            created_on
            updated_on
            is_deleted 
            question_id    
            response 
            Format:
            
            {
                question_no: "answer",
                question_no: "answer",
                question_no: "answer",
                ...
            }

        """
        try:

            if(pk == None):
                raise Exception()
            user_type = self.request.user 
            print("User type",user_type) 
            print(type(self.request.user))
            form_id = pk
            form_instance=Forms.objects.get(id=form_id)
            if form_instance.anonymous_response or not isinstance(user_type,AnonymousUser):        
                for question_no in request.data:
                    question_instance=Questions.objects.get(id=question_no)
                    new_response=Responses()
                    if not form_instance.anonymous_response:
                        new_response.user_id=user_type
                    new_response.form_id=form_instance
                    new_response.is_deleted=False
                    new_response.question_id=question_instance
                    new_response.response=request.data[question_no]
                    new_response.save()


        except:
            return Response("Something went wrong", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)

class SectionsViewSet(viewsets.ModelViewSet):
    queryset = Sections.objects.all()
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly
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
                    setattr(section_instance,field,OurUsers.objects.get(id=request.data[field]))
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
        permissions.IsAuthenticatedOrReadOnly
        # permissions.AllowAny
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
                    setattr(question_instance,field,OurUsers.objects.get(id=request.data[field]))
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
        permissions.IsAuthenticated
        # permissions.AllowAny
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
        permissions.IsAuthenticated
        # permissions.AllowAny
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
        permissions.IsAuthenticated
        # permissions.AllowAny
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




class FileUploadViewSet(viewsets.ModelViewSet):
    queryset = FileUpload.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
        # permissions.AllowAny,
    ]
    serializer_class = FileUploadSerializers

    @action(methods=['patch','post'], detail=True)
    def update_fields(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/fileupload/<fileupload-id>/update_fields/
            url: http://127.0.0.1:8000/fileupload/<fileupload-id>/update_fields/
            {
                "limit_mb": 2,
                "file_extenstion" : "jpg",
            }
        """
        try:
            if(pk == None):
                raise Exception()
            fileupload_id = pk
            fileupload_instance = FileUpload.objects.get(id=fileupload_id)
            for field in request.data:
                if field=="question_id":   #Changing question id after creating is not sensible
                    pass
                else:
                    setattr(fileupload_instance,field,request.data[field])
            fileupload_instance.save()
        except:
            return Response("Invalid Request", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)
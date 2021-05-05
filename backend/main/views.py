from main.models import Forms, OurUsers, Sections, Questions, Options, ShortPara, Responses, FileUpload, MyAnonymousUser
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.decorators import api_view
from .serializers import FormSerializers, SectionSerializers, QuestionSerializers, OptionsSerializers, ShortParaSerializers, ResponsesSerializers, FileUploadSerializers
from rest_framework.response import Response
from django.contrib.auth.models import AnonymousUser
import csv
from django.http import HttpResponse

class FormsViewSet(viewsets.ModelViewSet):
    """
    This viewset is used to create api's related to forms like fetching them, submitting responses , getting responses etc.

    1. Fetch all forms 
        GET request on https://sheroes-form.herokuapp.com/forms/

        The above URL can be used to fetch all the forms from the database. 

    2. Fetch a particular form 
        GET request on https://sheroes-form.herokuapp.com/forms/<form_id>/

        The above URL can be used to fetch a particular form from the database. 

    3. Update fields of a particular form 
        POST request on https://sheroes-form.herokuapp.com/forms/<form-id>/update_fields/
        eg: You can send this
        {
        "updated_by": 4,
        "section_sequence" : [1,3,2]
        "description" : "This is a sample description"
        } to update the section_sequence and description.
        This helps to change any field related to the forms like it's title, decription, section sequence, banner etc.
        Only those field which needs to be updated are sent using this API. The user needs to be authenticated as a Form Creator if
        he owns the form or Admin to make changes to a form. The authorization token for this will be passed as a Header. update_by is a mandatory field here.

    4. Fetch all Not deleted forms 
        GET request on https://sheroes-form.herokuapp.com/forms/get_all_not_del/

        Returns all the forms which are not deleted.By deleted it means that they are not soft deleted.
        Note: If you want to access a particular form, use the default GET request.
        Example : If user wants to access form number 37 use the following url
        https://sheroes-form.herokuapp.com/forms/37/

    5. Fetch all deleted forms 
        GET request on https://sheroes-form.herokuapp.com/forms/get_all_deleted_forms/

        Returns all the forms which were soft deleted.By deleted it means that they are not soft deleted.

    6. Accept Responses  for a form 
        Post request on https://sheroes-form.herokuapp.com/forms/<form-id>/accept_response/

        To send a response for a partiular form.
        The authorization token for this will be passed as a Header if forms wants authenticated responses otherwise NUll.
        This also supports editing response as of now.        
 
            Data Format :
            {
            question_id: "answer",
            question_id: "answer",
            question_id: "answer",
            ...
            }

    7. Get Responses  for a form 
        Get request on https://sheroes-form.herokuapp.com/forms/<form-id>/get_response/

        To get responses for a partiular form.The authorization token for this will be passed as a Header.
        Data is returned as a list.

            Format :
            ["user_id","user_name","response"]
            "response" has the data format of data submitted throug accet responses functionality.

    8. Get Responses in csv format which can be downloaded 
        Get request on https://sheroes-form.herokuapp.com/forms/<form-id>/get_response/

        To get csv of the user responses.The authorization token for this will be passed as a Header. 

    9. Form Creation 
        POST request on https://sheroes-form.herokuapp.com/forms/

        The above URL can be used to create a new form. Data to be sent in Json

    """
    # permission_classes = [
    #     permissions.AllowAny
    # ]

    def get_permissions(self):
        print(self.action)
        if self.action in ['update', 'partial_update', 'destroy', 'create','get_response','update_fields','get_csv']:
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
            return Forms.objects.all()
 
        

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
        data=FormSerializers(self.get_queryset(request.user).filter(is_deleted = False), many=True).data
        return Response( data,status=status.HTTP_200_OK)

    @action(methods=['get'], detail=False)
    def get_all_deleted_forms(self,request):
        """
        Returns all the forms which were soft deleted  by using GET request.
        This should be used via GET request.
        Format:
            heroku url: https://sheroes-form.herokuapp.com/forms/get_all_deleted_forms/
            local url:  http://127.0.0.1:8000/forms/get_all_deleted_forms/
        """
        data=FormSerializers(self.get_queryset(request.user).filter(is_deleted = True), many=True).data
        return Response(data,status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def accept_response(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/forms/<form-id>/accept_response/
            url: http://127.0.0.1:8000/forms/<form-id>/accept_response/
            JSON to be sent :
            Format:
            
            {
                question_no: "answer",
                question_no: "answer",
                question_no: "answer",
                ...
            }

        """
        # try:
        if(pk == None):
            raise Exception()
        user_type = self.request.user 
        print("User type",user_type) 
        print(type(self.request.user))
        form_id = pk
        form_instance=Forms.objects.get(id=form_id)
        current_response = {}
        cur_user_id = 0
        if form_instance.anonymous_response or not isinstance(user_type,AnonymousUser):
            if form_instance.anonymous_response:
                new_anonymous_user = MyAnonymousUser()
                new_anonymous_user.save()
                cur_user_id = new_anonymous_user.id
            else:
                cur_user_id = user_type.id
            for question_no in request.data:

                question_instance=Questions.objects.get(id=question_no)
                try:
                    temp_response_obj = Responses.objects.get(user_id = cur_user_id ,question_id = question_no)
                except:
                    temp_response_obj = None
                
                if(not form_instance.anonymous_response and temp_response_obj):
                    new_response = temp_response_obj
                else:
                    new_response=Responses()
                if not form_instance.anonymous_response:
                    new_response.user_id=user_type
                else:
                    new_response.anoymous_user_flag = True
                    new_response.anoymous_user_id = new_anonymous_user
                    
                new_response.form_id=form_instance
                new_response.is_deleted=False
                new_response.question_id=question_instance
                new_response.response=request.data[question_no]
                new_response.save()
                current_response[question_no]=new_response.id

        else:
            return Response("Something went wrong", status=status.HTTP_400_BAD_REQUEST)
                # form_instance.user_responses()
        print(len(form_instance.user_responses))
        print("This got printed")
        print(cur_user_id)
        form_instance.user_responses[cur_user_id]=current_response
        form_instance.save()
        # except:
        #     return Response("Something went wrong", status=status.HTTP_400_BAD_REQUEST)

        return Response("Update Accepted", status=status.HTTP_200_OK)
    
    @action(methods=['get'], detail=True)
    def get_response(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/forms/<form-id>/get_response/
            url: http://127.0.0.1:8000/forms/<form-id>/get_response/
            Dictionary to be sent :            
            {
                user_id : { "username" : <username here>,
                            "response" :
                                        {
                                            question_no: "answer",
                                            question_no: "answer",
                                            question_no: "answer" 
                                }

        """
        try:
            if(pk == None):
                raise Exception()
            user_type = self.request.user 
            print("User type",user_type) 
            print(type(self.request.user))
            form_response = {}

            form_id = pk
            form_instance=Forms.objects.get(id=form_id)
            responses = form_instance.user_responses
            form_resp_lis = []
            if(responses):
                for user_id in responses :
                    username_flag = False
                    form_response[user_id]={}
                    form_response[user_id]["response"]={}
                    for ques_no in responses[user_id]:
                        response_obj = Responses.objects.get(id=responses[user_id][ques_no])
                        form_response[user_id]["response"][ques_no]= response_obj.response
                        if not username_flag :
                            if response_obj.anoymous_user_flag :
                                form_response[user_id]["username"]="Anonymous"
                                username_flag = True
                            else:
                                user_obj = OurUsers.objects.get(id=user_id)
                                form_response[user_id]["username"]=user_obj.first_name + " " + user_obj.last_name
                                username_flag = True
                for user_id in responses :
                    cur_lis = []
                    cur_lis.append(user_id)
                    cur_lis.append(form_response[user_id]["username"])
                    cur_lis.append(form_response[user_id]["response"])
                    form_resp_lis.append(cur_lis)
    
            return Response(form_resp_lis, status=status.HTTP_200_OK)
        except:
            return Response("Something went wrong", status=status.HTTP_400_BAD_REQUEST)


    @action(methods=['get'], detail=True)
    def get_csv(self, request, pk=None):
        """
        Format:
            url: https://sheroes-form.herokuapp.com/forms/<form-id>/get_response/
            url: http://127.0.0.1:8000/forms/<form-id>/get_response/
        """
        try:
            if(pk == None):
                raise Exception()
            user_type = self.request.user 
            print("User type",user_type) 
            print(type(self.request.user))
            form_response = {}

            form_id = pk
            form_instance=Forms.objects.get(id=form_id)
            responses = form_instance.user_responses
            response = HttpResponse(
                content_type='text/csv',
                headers={'Content-Disposition': f'attachment; filename="{form_instance.heading}.csv"'}
            )

            if(responses):
                for user_id in responses :
                    username_flag = False
                    form_response[user_id]={}
                    form_response[user_id]["response"]={}
                    for ques_no in responses[user_id]:
                        response_obj = Responses.objects.get(id=responses[user_id][ques_no])
                        form_response[user_id]["response"][ques_no]= response_obj.response
                        if not username_flag :
                            if response_obj.anoymous_user_flag :
                                form_response[user_id]["username"]="Anonymous"
                                username_flag = True
                            else:
                                user_obj = OurUsers.objects.get(id=user_id)
                                form_response[user_id]["username"]=user_obj.first_name + " " + user_obj.last_name
                                username_flag = True
                writer = csv.writer(response)
                writer.writerow(["Title",form_instance.heading])
                writer.writerow(["Desciption",form_instance.description])

                section_instance = Sections.objects.all().filter(form_id=form_instance)
                ques_id_to_detail_map = {}
                for sec in section_instance:
                    ques_instance = Questions.objects.all().filter(section_id=sec)                 
                    for ques in ques_instance:
                        ques_id_to_detail_map[ques.id] = ques.statement
                writer.writerow(["UserName"]+list(ques_id_to_detail_map.values()))
                ques_lis = list(ques_id_to_detail_map.keys())
                # print(ques_lis)
                for user_id in responses :
                    cur_resp = [""]*(len(ques_lis))
                    for idx,ques_no in enumerate(ques_lis):
                        temp_dic = form_response[user_id]["response"]
                        str_ques = str(ques_no)
                        if(str_ques in temp_dic):
                            cur_resp[idx] = temp_dic[str_ques]
                        else:
                            cur_resp[idx] = " "
                    writer.writerow([form_response[user_id]["username"]]+cur_resp) 
            return response

        except:
            return Response("Something went wrong", status=status.HTTP_400_BAD_REQUEST)



class SectionsViewSet(viewsets.ModelViewSet):
    """
    This viewset is used to create api's related to sections.

    1. Fetch all sections 
        GET request on https://sheroes-form.herokuapp.com/sections/

        The above URL can be used to fetch all the forms from the database. 

    2. Fetch a particular section 
        GET request on https://sheroes-form.herokuapp.com/sections/<section_id>/

        The above URL can be used to fetch a particular section from the database. 

    3. Create a New section 
        POST request on https://sheroes-form.herokuapp.com/sections/

        The above URL can be used to create a new section. Data to be sent in Json. The Section gets automatically added to the form list.

    4. Update fields of a particular section 
        POST request on https://sheroes-form.herokuapp.com/sections/<section-id>/update_fields/
        
            eg: You can send this
            {
            "updated_by": 4,
            "question_sequence" : [1,3,2]
            "description" : "This is a sample description"
            } to update the question_sequence and description of a section.
    """
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
    """
    This viewset is used to create api's related to questions.

    1. Fetch all questions 
        GET request on https://sheroes-form.herokuapp.com/questions/

        The above URL can be used to fetch all the questions from the database. 

    2. Fetch a particular question 
        GET request on https://sheroes-form.herokuapp.com/questions/<question_id>/

        The above URL can be used to fetch a particular question from the database. 

    3. Create a New Question 
        POST request on https://sheroes-form.herokuapp.com/questions/

        The above URL can be used to create a new question. Data to be sent in Json. The question gets automatically added to the section list.

    4. Update fields of a particular question 
        POST request on https://sheroes-form.herokuapp.com/questions/<question_id>/update_fields/
        
            eg: You can send this
            {
            "updated_by": 4,
            "statement" : "This is a sample description"
            } to update question statement.
    """

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
    """
    This viewset is used to create api's related to questions.

    1. Fetch all short para questions 
        GET request on https://sheroes-form.herokuapp.com/shortparas/

        The above URL can be used to fetch all the  short para questions from the database. 

    2. Fetch a particular short para questions 
        GET request on https://sheroes-form.herokuapp.com/shortparas/<shortpara-id>/

        The above URL can be used to fetch a particular short para question from the database. 

    3. Create a New short para questions 
        POST request on https://sheroes-form.herokuapp.com/shortparas/

        The above URL can be used to create a new  short para question. Data to be sent in Json.

    4. Update fields of a particular short para questions
        POST request on https://sheroes-form.herokuapp.com/shortparas/<shortpara-id>/update_fields/
        
    """
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
    This viewset is used to create api's related to MCQ options.

    1. Fetch all MCQ options 
        GET request on https://sheroes-form.herokuapp.com/options/

        The above URL can be used to fetch all the MCQ options  from the database. 

    2. Fetch a particular MCQ option
        GET request on https://sheroes-form.herokuapp.com/options/<options-id>/

        The above URL can be used to fetch a particular MCQ option from the database. 

    3. Create a New MCQ options 
        POST request on https://sheroes-form.herokuapp.com/options/

        The above URL can be used to create a new MCQ options. Data to be sent in Json.

    4. Update fields of a particular MCQ option
        POST request on https://sheroes-form.herokuapp.com/options/<options-id>/update_fields/
        
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
    """
    This viewset is used to create api's related to responses.

    1. Fetch all Responses 
        GET request on https://sheroes-form.herokuapp.com/responses/

        The above URL can be used to fetch all the responses from the database. 

    2. Fetch a particular response
        GET request on https://sheroes-form.herokuapp.com/responses/<responses-id>/

        The above URL can be used to fetch a particular responses from the database. 

    3. Create a New response
        POST request on https://sheroes-form.herokuapp.com/responses/

        The above URL can be used to create a new response. Data to be sent in Json.

    4. Update fields of a particular response
        POST request on https://sheroes-form.herokuapp.com/responses/<responses-id>/update_fields/
        
    """

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
    """
    This viewset is used to create api's related to File upload questions.

    1. Fetch all File upload questions
        GET request on https://sheroes-form.herokuapp.com/fileupload/

        The above URL can be used to fetch all the File upload questions from the database. 

    2. Fetch a particular File upload question
        GET request on https://sheroes-form.herokuapp.com/fileupload/<fileupload-id>/

        The above URL can be used to fetch a particular File upload question from the database. 

    3. Create a New File upload question
        POST request on https://sheroes-form.herokuapp.com/fileupload/

        The above URL can be used to create a new File upload question. Data to be sent in Json.

    4. Update fields of a particular File upload question
        POST request on https://sheroes-form.herokuapp.com/fileupload/<fileupload-id>/update_fields/
        
    """
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
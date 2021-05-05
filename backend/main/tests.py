from django.test import TestCase
from .models import Forms, OurUsers,Sections,Questions
from .views import FormsViewSet, QuestionsViewSet, SectionsViewSet

from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate, APIClient
from rest_framework.authtoken.models import Token
import json

class AccessAndDeleteTestCase(TestCase):
    def setUp(self):
        self.CR1=OurUsers(username="underhood31", email="manavjeet18295@iiitd.ac.in", first_name="Manavjeet", last_name="Singh", gender="M",user_type="CR", password="123456")
        self.CR2=OurUsers(username="teenvan", email="manavjeetsingh31@gmail.com", first_name="Navneet", last_name="Ag", gender="M",user_type="CR", password="123456")
        self.admin=OurUsers(username="theAdmin", email="asdad@gmail.com", first_name="ad", last_name="min", gender="M",user_type="AD", password="123456")
        self.CR1.save()
        self.CR2.save()
        self.admin.save()
        for _ in range(10):
            Forms.objects.create(
                heading="This is a sample form " + str(_) +  " by CR1",
                banner_toggle=False,
                description="this is a test form",
                section_sequence={},
                consent_toggle=False,
                is_active=True,
                edit_response_toggle=False,
                created_by=self.CR1,
                updated_by=self.CR1,
                anonymous_response=False
            )

        for _ in range(10):
            Forms.objects.create(
                heading="This is a sample form " + str(_) +  " by CR2",
                banner_toggle=False,
                description="this is a test form",
                section_sequence={},
                consent_toggle=False,
                is_active=True,
                edit_response_toggle=False,
                created_by=self.CR2,
                updated_by=self.CR2,
                anonymous_response=False
            )


    def test_can_access_forms(self):
        """
        Creates 10 forms from CR1 user and 10 from CR2 user
        and check that they are only able to see their own forms.
        Also chek if ADMIN user is able to see all the forms.
        """

        #Geting form response for CR1 
        factory=APIRequestFactory()
        view=FormsViewSet.as_view({'get': 'get_all_not_del'})
        req=factory.get('/forms/get_all_not_del/')
        force_authenticate(req,user=self.CR1)
        response=view(req)
        for form in response.data:
            self.assertEqual(form["created_by"],self.CR1.id)
        self.assertEqual(len(response.data),10)
    
        #Geting form response for CR2
        factory=APIRequestFactory()
        view=FormsViewSet.as_view({'get': 'get_all_not_del'})
        req=factory.get('/forms/get_all_not_del/')
        force_authenticate(req,user=self.CR2)
        response=view(req)
        for form in response.data:
            self.assertEqual(form["created_by"],self.CR2.id)
        self.assertEqual(len(response.data),10)

        #Geting form response for admin 
        factory=APIRequestFactory()
        view=FormsViewSet.as_view({'get': 'get_all_not_del'})
        req=factory.get('/forms/get_all_not_del/')
        force_authenticate(req,user=self.admin)
        response=view(req)
        self.assertEqual(len(response.data),20)


    def test_form_soft_deletion(self):
        """
        Delete 5 from 10 forms created by the
        user CR2, and checks if the only 5 forms
        are retreive by get all the forms.
        Also check the soft deletion be checking that 
        the number of deleted forms is also 5.
        """

        factory=APIRequestFactory()
        view=FormsViewSet.as_view({'get': 'get_all_not_del'})
        req=factory.get('/forms/get_all_not_del/')
        force_authenticate(req,user=self.CR2)
        response=view(req)
        for form in response.data:
            self.assertEqual(form["created_by"],self.CR2.id)
        self.assertEqual(len(response.data),10)

        i=0
        for form  in response.data:
            if(i<5):
                Forms.objects.get(pk=form["id"]).delete()
            else:
                break
            i+=1

        factory=APIRequestFactory()
        view=FormsViewSet.as_view({'get': 'get_all_not_del'})
        req=factory.get('/forms/get_all_not_del/')
        force_authenticate(req,user=self.CR2)
        response=view(req)
        for form in response.data:
            self.assertEqual(form["created_by"],self.CR2.id)
        self.assertEqual(len(response.data),5)

        factory=APIRequestFactory()
        view=FormsViewSet.as_view({'get': 'get_all_deleted_forms'})
        req=factory.get('/forms/get_all_deleted_forms/')
        force_authenticate(req,user=self.CR2)
        response=view(req)
        for form in response.data:
            self.assertEqual(form["created_by"],self.CR2.id)
        self.assertEqual(len(response.data),5)


class CreationAndEditTestCase(TestCase):
    def setUp(self):
        self.CR=OurUsers(username="teenvan", email="manavjeetsingh31@gmail.com", first_name="Navneet", last_name="Ag", gender="M",user_type="CR", password="123456")
        self.CR.save()
        self.form=Forms.objects.create(
            heading="This is a sample form by CR",
            banner_toggle=False,
            description="this is a test form",
            section_sequence=[],
            consent_toggle=False,
            is_active=True,
            edit_response_toggle=False,
            created_by=self.CR,
            updated_by=self.CR,
            anonymous_response=False
        )

        self.section=Sections.objects.create(
            heading="This a sample section by CR",
            question_sequence= [],
            form_id= Forms.objects.get(created_by=self.CR),
            created_by= self.CR,
            updated_by=self.CR
        )

        self.question=Questions.objects.create(
            section_id = Sections.objects.get(created_by=self.CR),
            statement = "This is a sample question by CR",
            created_by = self.CR,
            updated_by = self.CR,
            qtype = "LP",
        )

    def test_question_creation(self):
        factory=APIRequestFactory()
        view=QuestionsViewSet.as_view({'get': 'list'})
        req=factory.get('/questions/'+str(self.question.id)+"/")
        force_authenticate(req,user=self.CR)
        response=view(req)#,item_id=self.question.id)
        for question in response.data:
            self.assertEqual(question["created_by"],self.CR.id)
            self.assertEqual(question["statement"],"This is a sample question by CR")

        
    def test_question_updation(self):
        #updating
        factory=APIRequestFactory()
        view=QuestionsViewSet.as_view({'post': 'update_fields'})
        req=factory.post('/questions/'+str(self.question.id)+"/update_fields/",{'statement':'updated statement', 'updated_by':self.CR.id})
        force_authenticate(req,user=self.CR)
        response=view(req,self.CR.username)
        # print('\n\n\n\n\n')
        # print(response.data)
        # print('\n\n\n\n\n')
        #checking
        factory=APIRequestFactory()
        view=QuestionsViewSet.as_view({'get': 'list'})
        req=factory.get('/questions/'+str(self.question.id)+"/")
        force_authenticate(req,user=self.CR)
        response=view(req)#,item_id=self.question.id)
        for question in response.data:
            self.assertEqual(question["created_by"],self.CR.id)
            # self.assertEqual(question["statement"],"updated statement")

    
    def test_form_creation(self):
        factory=APIRequestFactory()
        view=FormsViewSet.as_view({'get': 'list'})
        req=factory.get('/forms/'+str(self.question.id)+"/")
        force_authenticate(req,user=self.CR)
        response=view(req)#,item_id=self.question.id)
        for form in response.data:
            self.assertEqual(form["created_by"],self.CR.id)
            self.assertEqual(form["heading"],"This is a sample form by CR")

    def test_section_creation(self):
        factory=APIRequestFactory()
        view=SectionsViewSet.as_view({'get': 'list'})
        req=factory.get('/questions/'+str(self.question.id)+"/")
        force_authenticate(req,user=self.CR)
        response=view(req)#,item_id=self.question.id)
        for sections in response.data:
            self.assertEqual(sections["created_by"],self.CR.id)
            self.assertEqual(sections["heading"],"This a sample section by CR")

        
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.core import validators
from sheroes_forms import settings
from django.utils import timezone
User = settings.AUTH_USER_MODEL

# Manger for OurUser model
class OurUserManager(UserManager):
    def _create_user(self, username, user_type, email, password,
                     is_staff, is_superuser, first_name, last_name, gender, partner_id, sheroes_id, **extra_fields):
        """
        Creates and saves a User with the given username, email and password.
        """
        now = timezone.now()
        if not username:
            raise ValueError('The given username must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, first_name=first_name,
                            last_name=last_name, gender=gender, partner_id=partner_id, sheroes_id=sheroes_id, user_type=user_type, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, user_type,email=None, password=None, first_name=None, last_name=None, gender='F', partner_id=None, sheroes_id=None,**extra_fields):
        return self._create_user(username, user_type, email, password, False, False, first_name, last_name, gender, partner_id, sheroes_id, **extra_fields)


class OurUsers(AbstractBaseUser, PermissionsMixin):
    class GenderType(models.TextChoices):
        MALE = 'M', 'Male'
        FEMALE = 'F','Short'
        OTHER = 'O','Other'

    class UserType(models.TextChoices):
        ADMIN = 'AD', 'Admin'
        CREATOR = 'CR','Creator'
        ENDUSER = 'EU','End User'

    username = models.CharField(max_length=30, unique=True)
    objects = OurUserManager()

    first_name = models.CharField(max_length=500, null = True)
    last_name = models.CharField(max_length=500, null = True)
    USERNAME_FIELD =    'username' 
    email =                 models.EmailField(verbose_name='email', max_length=64, unique=True)
    
    # id = models.BigIntegerField(primary_key=True)
    gender = models.CharField(
        max_length=2,
        choices = GenderType.choices,
        default = GenderType.FEMALE
    )

    partner_id = models.BigIntegerField(null=True)
    sheroes_id = models.BigIntegerField(null=True)
    
    user_type = models.CharField(
        max_length=2,
        choices = UserType.choices,
        default = UserType.ENDUSER
    )

    

# Create your models here.
class Forms(models.Model):
    heading = models.TextField(max_length=50,null=True)
    banner_toggle = models.BooleanField(null=False, default=False)
    banner_path = models.CharField(max_length=500, null=True)
    description = models.TextField(null=True)
    section_sequence = models.JSONField()
    consent_toggle = models.BooleanField(null=False, default=False)
    consent_text = models.TextField(null=True)
    start_time = models.DateTimeField(null=True)
    end_time = models.DateTimeField(null=True)
    is_active = models.BooleanField(null=False, default=True)
    edit_response_toggle = models.BooleanField(null=False, default=False)
    created_on = models.DateTimeField(auto_now_add=True,null=False)
    updated_on = models.DateTimeField(auto_now=True, null=False) #update
    created_by =  models.ForeignKey(OurUsers,on_delete=models.CASCADE,related_name = "form_created_by") #edit
    updated_by =  models.ForeignKey(OurUsers,on_delete=models.CASCADE,related_name = "form_updated_by") #edit
    is_deleted = models.BooleanField(null=False,default=False)

    def delete(self, *args, **kwargs):
        """
        This function was Overriden because we want to soft delete instead of hard delete.
        """
        print("form delete")
        self.is_deleted = True
        current_section_sequence = self.section_sequence

        #This can be modified if we have to hard delete the sections

        # for sec_id in current_section_sequence:
        #     current_section = Sections.objects.get(id = sec_id )
            # current_section.delete()

        self.save()

    def get(self, *args, **kwargs):
        print("get")
        # super().save(*args, **kwargs)
    def all(self, *args, **kwargs):
        print("all")



# class Page(models.Model):
#     form_id = models.ForeignKey(Forms)
#     #update in form_id
#     # deete.cascade option
#     section_sequence = models.TextField(max_length=500, null=False)
#     created_on = models.DateTimeField(auto_now_add = False, null= False ) 
#     updated_on = models.DateTimeField(auto_now_add = True, null= False )
#     created_by =  models.ForeignKey(User)
#     updated_by =  models.ForeignKey(User)

class Sections(models.Model):
    heading = models.TextField(max_length=50,null=True)
    description = models.TextField(max_length=50,null=True)
    question_sequence = models.JSONField()
    form_id = models.ForeignKey(Forms,on_delete=models.CASCADE) #edit
    #update in form_id
    # deete.cascade option
    randomize_toggle = models.BooleanField(null=False, default=False)
    created_on = models.DateTimeField(auto_now_add=True,null=False)
    updated_on = models.DateTimeField(auto_now=True, null=False) #update
    created_by =  models.ForeignKey(OurUsers,on_delete=models.CASCADE,related_name = "section_created_by") #edit
    updated_by =  models.ForeignKey(OurUsers,on_delete=models.CASCADE,related_name = "section_updated_by") #edit
    
    def save(self,*args,**kwargs):
        new_section = super().save(*args, **kwargs)
        current_form = self.form_id
        if(self.id not in current_form.section_sequence):
            current_form.section_sequence.append(self.id)
        current_form.save()

    def delete(self, *args, **kwargs):
        form_instance=self.form_id
        # print("Form id:", form_instance.id, "Sec id:",self.id)
        try:
            form_instance.section_sequence.remove(self.id)
        except:
            print("Section not in form.section_sequence;this section must have been already soft deleted")
        form_instance.save()

        #hard delete only if there is no response for the question.
        deleted=[]
        if len(Responses.objects.all().filter(form_id=form_instance.id))==0:
            deleted=super().delete(*args, **kwargs)

        return deleted

    #no is_deleted field here .    
    def soft_delete(self):
        ques_seq = self.question_sequence
        ques_seq_obj = Questions.objects.all()
        for ques in ques_seq:
            for ques_obj in ques_seq_obj:
                if(ques_obj.id == ques.id):
                    ques_obj.delete()

class Questions(models.Model):
    class QuestionType(models.TextChoices): #edit
        MULTIPLE = 'MC', 'Multiple Choice'
        SHORT = 'SP', 'Short Para'
        LONG = 'LP', 'Long Para'
        FILE = 'FU', 'File Upload'
    statement = models.TextField(null=False)
    section_id = models.ForeignKey(Sections,on_delete=models.CASCADE) #edit
    qtype = models.CharField(
        max_length=2, 
        choices=QuestionType.choices,
        null=False
    )
    mandatory_toggle = models.BooleanField(default=False, null=False)
    image_toggle_1 = models.BooleanField(default=False, null=False)
    image_path_1 =models.CharField(max_length=500, null=True)
    image_toggle_2 = models.BooleanField(default=False, null=False)
    image_path_2 =models.CharField(max_length=500, null=True)
    quiz_toggle = models.BooleanField(null=False, default=False)
    correct_score = models.IntegerField(null=True, default=0)
    incorrect_score = models.IntegerField(null=True, default=0)
    # title = models.CharField(max_length=255, null=False)
    created_on = models.DateTimeField(auto_now_add=True,null=False)
    updated_on = models.DateTimeField(auto_now=True, null=False) #update
    created_by =  models.ForeignKey(OurUsers,on_delete=models.CASCADE,related_name = "question_created_by") #edit
    updated_by =  models.ForeignKey(OurUsers,on_delete=models.CASCADE,related_name = "question_updated_by") #edit
    
    def save(self,*args,**kwargs):
        new_question = super().save(*args, **kwargs)
        current_section = self.section_id
        if(self.id not in current_section.question_sequence):
            current_section.question_sequence.append(self.id)
        current_section.save()

    def delete(self, *args, **kwargs):
        section_instance=self.section_id
        # print("Section id:", section_instance.id, "question id:",self.id)
        try:
            section_instance.question_sequence.remove(self.id)
        except:
            print("Question not in section.question_sequence; this should happen if the form is already deleted")
        section_instance.save()

        #hard delete only if there is no response for the question.
        deleted=[]
        if len(Responses.objects.all().filter(question_id=self.id)) == 0:
            deleted=super().delete(*args, **kwargs)

        return deleted


class Options(models.Model):
    question_id = models.ForeignKey(Questions,on_delete=models.CASCADE) #edit
    content = models.TextField(max_length=255)
    image_toggle = models.BooleanField(default=False, null=False)
    image_path = models.CharField(max_length=500, null=True)
    correct_answer = models.BooleanField(null=False, default=False)


class Dropdown(models.Model):
    question_id = models.ForeignKey(Questions,on_delete=models.CASCADE) #edit
    dropdown_json = models.JSONField()
    correct_answer = models.CharField(max_length=256, null=True)


class Responses(models.Model):
    """
    Send response at https://sheroes-form.herokuapp.com/responses/
    Example: 
            {
                "user_id": "2",
                "form_id": "30",
                "question_id": "29",
                "response": "Hello"
            }   
    """
    user_id = models.ForeignKey(OurUsers,on_delete=models.CASCADE) #edit
    form_id = models.ForeignKey(Forms,on_delete=models.CASCADE) #edit
    created_on = models.DateTimeField(auto_now_add=True,null=False)
    updated_on = models.DateTimeField(auto_now=True, null=False) #update
    is_deleted = models.BooleanField(default=False)
    question_id = models.ForeignKey(Questions,on_delete = models.CASCADE)     
    response = models.JSONField()
    def save(self,*args,**kwargs):        
        current_form = self.form_id
        if( current_form.is_active and not(current_form.is_deleted) ):
            new_response = super().save(*args, **kwargs)

class ShortPara(models.Model):
    class DataType(models.TextChoices):
        TEXT = 'TXT', 'Text'
        INTEGER = 'INT','Integer'
        FLOATING = 'FLT','Float'

    question_id = models.ForeignKey(Questions,on_delete=models.CASCADE) #edit
    limit_length = models.BigIntegerField()
    datatype = models.CharField(
        max_length=3,
        choices = DataType.choices,
        default = DataType.TEXT
    )
    correct_answer = models.TextField(max_length = 5000)

class FileUpload(models.Model):
    question_id = models.ForeignKey(Questions,on_delete=models.CASCADE) #edit
    limit_mb = models.FloatField()
    file_extenstion = models.CharField(max_length = 10)


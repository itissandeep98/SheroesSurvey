from django.db import models

# Create your models here.
class Forms(models.Model):
    heading = models.TextField(max_length=50,null=False)
    banner_toggle = models.BooleanField(null=False)
    banner_path = models.CharField(max_length=500, null=True)
    description = models.TextField(null=True)
    page_sequence = models.JSONField()
    conset_toggle = models.BooleanField(null=False)
    consent_text = models.TextField(null=True)
    start_time = models.DateTimeField(null=False)
    end_time = models.DateTimeField(null=True)
    is_active = models.BooleanField(null=False)
    edit_response_toggle = models.BooleanField(null=False)
    created_on = models.DateTimeField(null=False)
    updated_on = models.DateTimeField(auto_now=True, null=False) #update
    created_by = models.BigIntegerField(null=False)
    updated_by = models.BigIntegerField(null=False)
    is_deleted = models.BooleanField(null=False,default=False)
  
# class Page(models.Model):
#     form_id = models.ForeignKey(Forms.id)
#     #update in form_id
#     # deete.cascade option
#     section_sequence = models.TextField(max_length=500, null=False)
#     created_on = models.DateTimeField(auto_now_add = False, null= False ) 
#     updated_on = models.DateTimeField(auto_now_add = True, null= False )
#     created_by =  models.ForeignKey(User.id)
#     updated_by =  models.ForeignKey(User.id)

class Section(models.Model):
    heading = models.TextField(max_length=50,null=False)
    description = models.TextField(max_length=50,null=False)
    question_sequence = models.JSONField()
    form_id = models.ForeignKey(Forms.id) #edit
    #update in form_id
    # deete.cascade option
    randomize_toggle = models.BooleanField(null=False)
    created_on = models.DateTimeField(auto_now_add = False, null= False ) 
    updated_on = models.DateTimeField(auto_now_add = True, null= False )
    created_by =  models.ForeignKey(User.id) #edit
    updated_by =  models.ForeignKey(User.id) #edit

class Questions(models.Model):
    class QuestionType(models.TextChoices): #edit
        MULTIPLE = 'MC', ('Multiple Choice')
        SHORT = 'SP', _('Short Para')
        LONG = 'LP', _('Long Para')
        FILE = 'FU', _('File Upload')
    statement = models.TextField(null=False)
    section_id = models.ForeignKey(Section.id) #edit
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
    title = models.CharField(max_length=255, null=False)
    created_on = models.DateTimeField(null=False)
    updated_on = models.DateTimeField(auto_now=True, null=False) #update
    created_by = models.BigIntegerField(null=False)
    updated_by = models.BigIntegerField(null=False)

class Options(models.Model):
    question_id = models.ForeignKey(Questions.id) #edit
    content = models.TextField(max_length=255)
    image_toggle = models.BooleanField(default=False, null=False)
    image_path = models.CharField(max_length=500, null=True)
    correct_answer = models.BooleanField(null=False, default=False)
    
class Dropdown(models.Model):
    question_id = models.ForeignKey(Questions.id) #edit
    dropdown_json = models.JSONField()
    correct_answer = models.CharField(max_length=256, null=True)


class Responses(models.Model):
    user_id = models.ForeignKey(Users.id) #edit
    form_id = models.ForeignKey(Forms.id) #edit
    created_on = models.DateTimeField(auto_now_add = False, null= False ) 
    updated_on = models.DateTimeField(auto_now_add = True, null= False )
    is_deleted = models.BooleanField(null=False)
    question_id = models.ForeignKey(Questions.id)     
    response = models.TextField(max_length=500)

class ShortPara(models.Model):
    class DataType(models.TextChoices):
        TEXT = 'TXT', 'Text'
        INTEGER = 'INT','Integer'
        FLOATING = 'FLT','Float'

    question_id = models.ForeignKey(Questions.id) #edit
    limit_length = models.BigIntegerField()
    datatype = models.CharField(
        max_length=2,
        choices = DataType.choices,
        default = DataType.TEXT
    )
    correct_answer = models.TextField(max_length = 5000)

class FileUpload(models.Model):
    question_id = models.ForeignKey(Questions.id) #edit
    limit_mb = models.FloatField()
    file_extenstion = models.CharField(max_lenght = 10)

class Users(models.Model):
    class GenderType(models.TextChoices):
        MALE = 'M', 'Male'
        FEMALE = 'F','Short'
        OTHER = 'O','Other'

    class UserType(models.TextChoices):
        ADMIN = 'AD', 'Admin'
        CREATOR = 'CR','Creator'
        ENDUSER = 'EU','End User'


    first_name = models.CharField(max_length=500, null = False)
    last_name = models.CharField(max_length=500, null = False)
    gender = models.CharField(
        max_length=2,
        choices = GenderType.choices,
        default = GenderType.FEMALE
    )

    partner_id = models.BigIntegerField()
    sheroes_id = models.BigIntegerField()
    
    user_type = models.UserType(
        max_length=2,
        choices = UserType.choices,
        default = UserType.EU
    )
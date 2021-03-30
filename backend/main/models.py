from django.db import models


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
    created_by =  models.ForeignKey(Users,on_delete=models.CASCADE,related_name = "form_created_by") #edit
    updated_by =  models.ForeignKey(Users,on_delete=models.CASCADE,related_name = "form_updated_by") #edit
    is_deleted = models.BooleanField(null=False,default=False)
  
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
    created_by =  models.ForeignKey(Users,on_delete=models.CASCADE,related_name = "section_created_by") #edit
    updated_by =  models.ForeignKey(Users,on_delete=models.CASCADE,related_name = "section_updated_by") #edit
    
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
            print("Section not in form.section_sequence; this should never happen")
        form_instance.save()
        deleted=super().delete(*args, **kwargs)
        return deleted

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
    created_by =  models.ForeignKey(Users,on_delete=models.CASCADE,related_name = "question_created_by") #edit
    updated_by =  models.ForeignKey(Users,on_delete=models.CASCADE,related_name = "question_updated_by") #edit
    
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
            print("Question not in section.question_sequence; this should never happen")
        section_instance.save()
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
    user_id = models.ForeignKey(Users,on_delete=models.CASCADE) #edit
    form_id = models.ForeignKey(Forms,on_delete=models.CASCADE) #edit
    created_on = models.DateTimeField(auto_now_add=True,null=False)
    updated_on = models.DateTimeField(auto_now=True, null=False) #update
    is_deleted = models.BooleanField(null=False)
    question_id = models.ForeignKey(Questions,on_delete = models.CASCADE)     
    response = models.JSONField()

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


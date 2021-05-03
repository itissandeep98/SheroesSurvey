from rest_framework import serializers
from main.models import Forms, OurUsers, Sections, Questions, Options, ShortPara, Responses, FileUpload

class FormSerializers(serializers.ModelSerializer):
    class Meta:
        model = Forms
        # fields = '__all__'
        exclude = ['user_responses']
class SectionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Sections
        fields = '__all__'

class QuestionSerializers(serializers.ModelSerializer):
    question_metadata_id = serializers.SerializerMethodField('create_sub')
    class Meta:
        model = Questions
        fields = '__all__'
    
    def create_sub(self, obj):
        if(obj.qtype=="SP"):
            spObj = ShortPara()
            spObj.question_id=obj
            spObj.limit_length=25
            spObj.datatype="TXT"
            spObj.save()
            return spObj.id
        elif (obj.qtype=='FU'):
            flObj = FileUpload()
            flObj.question_id=obj
            flObj.limit_mb=5
            flObj.save()
            return flObj.id
        return None
        
    # def create(self, validated_data):
    #     print("I was here")
    #     # super.create(validated_data)
    #     obj = Questions.objects.create(**validated_data)
        
    #     return obj,spObj

class ShortParaSerializers(serializers.ModelSerializer):
    class Meta:
        model = ShortPara
        fields = '__all__'

class OptionsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Options
        fields = '__all__'

class ResponsesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Responses
        fields = '__all__'




 
class FileUploadSerializers(serializers.ModelSerializer):
    class Meta:
        model = FileUpload
        fields = '__all__'
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
        print(obj)
        print(self.fields)
        if(obj.qtype=="SP"):
            spObj = ShortPara()
            if len(obj.other_ques_params)==0:
                #default
                obj.other_ques_params["datatype"]="TXT"
                obj.other_ques_params["limit_length"]=100

            if(obj.other_ques_params["datatype"] == "TXT"):
                spObj.datatype="TXT"
                spObj.question_id=obj
                spObj.limit_length=obj.other_ques_params["limit_length"]
            elif(obj.other_ques_params["datatype"] == "INT" or obj.other_ques_params["datatype"]  == "FLT" ):
                spObj.datatype=obj.other_ques_params["datatype"] 
                spObj.question_id=obj
                spObj.max_val=obj.other_ques_params["max_val"]
                spObj.min_val=obj.other_ques_params["min_val"]
            spObj.save()
            return spObj.id
        elif (obj.qtype=='FU'):
            if len(obj.other_ques_params)==0:
                #default
                obj.other_ques_params["limit_mb"]=2
            flObj = FileUpload()
            flObj.question_id=obj
            flObj.limit_mb=obj.other_ques_params["limit_mb"]
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
from rest_framework import serializers
from main.models import Forms, OurUsers, Sections, Questions, Options, ShortPara, Responses

class FormSerializers(serializers.ModelSerializer):
    class Meta:
        model = Forms
        fields = '__all__'


class OurUsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = OurUsers
        fields = '__all__'

class SectionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Sections
        fields = '__all__'

class QuestionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Questions
        fields = '__all__'

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
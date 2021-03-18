from rest_framework import serializers
from main.models import Forms, Users, Sections

class FormSerializers(serializers.ModelSerializer):
    class Meta:
        model = Forms
        fields = '__all__'


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class SectionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Sections
        fields = '__all__'
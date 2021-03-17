from rest_framework import serializers
from main.models import Forms, Users

class FormSerializers(serializers.ModelSerializer):
    class Meta:
        model = Forms
        fields = '__all__'


class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

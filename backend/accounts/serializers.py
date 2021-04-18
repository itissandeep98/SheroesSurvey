from rest_framework import serializers
from main.models import OurUsers
from django.contrib.auth import authenticate

#User Serializer

class OurUsersSerializers(serializers.ModelSerializer):
    class Meta:
        model = OurUsers
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'gender', 'partner_id', 'sheroes_id', 'user_type')

#Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = OurUsers
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'gender', 'partner_id', 'sheroes_id', 'user_type', 'password')
        extra_kwargs = {'password': {'write_only':True}}

    def create(self, validated_data):
        user=OurUsers.objects.create_user (
            validated_data['username'], validated_data['user_type'], validated_data['email'], validated_data['password'], 
            validated_data['first_name'],
            validated_data['last_name'], validated_data['gender'], validated_data['partner_id'], validated_data['sheroes_id']
        )
        return user
#Login Serializer
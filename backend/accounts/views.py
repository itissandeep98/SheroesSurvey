from django.shortcuts import render
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import OurUsersSerializers, RegisterSerializer, LoginSerializer
import sendgrid
import os
from sendgrid.helpers.mail import Mail, Email, To, Content


#Register API
class RegisterAPI(generics.GenericAPIView):
    """
    Api to register on out platform.

    Post request on https://sheroes-form.herokuapp.com/auth/register

        Example of Data format to be sent = {
        "username": "itisunderhood998",
        "email": "manavjeet@gmail.com",
        "password": "123456",
        "first_name": "MANAVJeet", 
        "last_name": "Singh",
        "gender": "M",
        "user_type": "EU"
        }
    """
    serializer_class=RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
        from_email = Email("navneet18348@iiitd.ac.in")  # Change to your verified sender
        to_email = To(user.email)  # Change to your recipient
        subject = "Sheroes-Form Registration"
        content = Content("text/plain",f"Thank you for registering on this platform.\n Your username is: {user.username}.\n You can now login using the link : https://sheroes.pages.dev \n Regards, \n Team-3 Sheroes")
        mail = Mail(from_email, to_email, subject, content)

        # Get a JSON-ready representation of the Mail object
        mail_json = mail.get()

        # Send an HTTP POST request to /mail/send
        try:
            response = sg.client.mail.send.post(request_body=mail_json)
            print("Sent successfull")
        except Exception as e:
            print("Error")
            print(e.message)
        return Response({
            "user": OurUsersSerializers(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

#Login API
class LoginAPI(generics.GenericAPIView):
    """
    Api to log in out platform.

    Post request on https://sheroes-form.herokuapp.com/auth/login

        Example of Data format to be sent = {
        "username": "itisunderhood998",
        "password": "123456",
        }
        You get Authentication token in response.
    """

    serializer_class=LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": OurUsersSerializers(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

#Get User API
class UserAPI(generics.RetrieveAPIView):
    permissions=[
        permissions.IsAuthenticated,
    ]

    serializer_class=OurUsersSerializers

    def get_object(self):
        #looks at the token in the request and returns the user associated with that token
        return self.request.user
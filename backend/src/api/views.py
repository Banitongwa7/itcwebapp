import datetime
import json
import jwt
from django.contrib.auth.hashers import check_password
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed
from .models import userModel, archiveUser, dataScraper, codeauth
from .serializers import UserSerializer, SuperUserSerializer, ChangePasswordSerializer, DataScraperSerializer, \
    CodeAuthSerializer
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from random import randrange
from django.core.mail import send_mail



#from django.http import JsonResponse
#from rest_framework.response import Response
#from rest_framework.decorators import api_view, permission_classes
#from rest_framework.permissions import IsAuthenticated




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['full_name'] = user.full_name
        token['superuser'] = user.is_superuser
        token['phone'] = user.phone
        token['picture'] = json.dumps(str(user.picture))
        try:
            coded = codeauth.objects.get(user_id=user.id)
            coded.delete()
            code = codeauth.objects.create(user=user)
            try:
                send_mail("ITC Two Factor Auth",
                          "Bonjour {} \nCode d'authentification : {}\nMerci".format(user.full_name, code.number),
                          "zonetmp18@gmail.com", ["davidbanitongwa@gmail.com"], fail_silently=False)
            except:
                Response(404)
        except codeauth.DoesNotExist:
            code = codeauth.objects.create(user=user)
            try:
                send_mail("ITC Two Factor Auth",
                          "Bonjour {} \nCode d'authentification : {}\nMerci".format(user.full_name, code.number),
                          "zonetmp18@gmail.com", ["davidbanitongwa@gmail.com"], fail_silently=False)
            except:
                Response(404)

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




# Login User Agent

class LoginAgentView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = userModel.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('Email or Password Incorrect')
        if not user.check_password(password):
            raise AuthenticationFailed('Email or Password Incorrect')

        payload = {
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'david123', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }
        return response





# All Agent - GET and POST

class AgentTable(APIView):
    def get(self, request):
        allAgent = userModel.objects.filter(is_superuser=0)
        serilizerAgent = UserSerializer(allAgent, many=True)
        return Response(serilizerAgent.data)

    def post(self,request):
        serializerNewAgent = UserSerializer(data=request.data)
        if serializerNewAgent.is_valid():
            serializerNewAgent.save()
            return Response(200)
        return Response(404)





# Update Agent

class UpdateAgent(APIView):
    def post(self,request,pk):
        try:
            agent = userModel.objects.get(id=pk)
        except:
            return Response(404)
        passw = str(request.data['password'])
        if check_password(passw, agent.password):
            serializeAgent = UserSerializer(instance=agent, data=request.data)
            if serializeAgent.is_valid():
                serializeAgent.save()
                return Response(200)

        return Response(404)


# All admin - GET and POST

class AdminTable(APIView):
    def get(self, request):
        allAdmin = userModel.objects.filter(is_superuser=1)
        serilizerAdmin = SuperUserSerializer(allAdmin, many=True)
        return Response(serilizerAdmin.data)

    def post(self,request):
        serializerNewAdmin = SuperUserSerializer(data=request.data)
        if serializerNewAdmin.is_valid():
            serializerNewAdmin.save()
            return Response(200)
        return Response(serializerNewAdmin.errors)





# Update Admin

class UpdateAdmin(APIView):
    def post(self,request,pk):
        try:
            admin = userModel.objects.get(id=pk)
        except:
            return Response(404)

        passw = str(request.data['password'])
        if check_password(passw, admin.password):
            serializeAdmin = UserSerializer(instance=admin, data=request.data)
            if serializeAdmin.is_valid():
                serializeAdmin.save()
                return Response(200)
        return Response(404)



# Archive User ( Admin and Agent)

class ArchiveUser(APIView):
    def post(self,request,pk):
        try:
            agent = userModel.objects.get(pk=pk)
        except:
            return Response("Not Found in Database")

        archiveUser.objects.create(full_name=agent.full_name, email=agent.email, phone=agent.phone, is_staff=agent.is_staff, is_superuser=agent.is_superuser)

        agent.delete()
        return Response(200)


class ChangePassword(APIView):
    def post(self,request):
        try:
            agent = userModel.objects.get(email=request.data['email'])
            passfinal = {}
            # Random password
            ch = agent.full_name
            passw = "{}{}".format(ch[:3], str(randrange(900000)))
            passfinal['password'] = passw
            serializeUser = ChangePasswordSerializer(instance=agent, data=passfinal)

            if serializeUser.is_valid():
                serializeUser.save()
                # Send password by email
                try:
                    send_mail('ITC Consulting Changement de password', 'Bonjour {} \nVotre nouveau mot de passe : {}\nMerci'.format(ch, passw), 'zonetmp18@gmail.com', ['davidbanitongwa@gmail.com'], fail_silently=False)
                except:
                    print("Erreur email")
                return Response(200)
        except:
            return Response(404)

        return Response(serializeUser.errors)



# Edit Agent by Admin

class EditAgent(APIView):
    def post(self,request,pk):
        try:
            agent = userModel.objects.get(id=pk)
        except:
            return Response(404)

        serializeAgent = UserSerializer(instance=agent, data=request.data)
        if serializeAgent.is_valid():
            serializeAgent.save()
            return Response(200)

        return Response(404)



# All Data Scraperfrom django.db.models.signals import post_save
from django.dispatch import receiver

class DataScraperView(viewsets.ModelViewSet):
    queryset = dataScraper.objects.all()
    serializer_class = DataScraperSerializer



# Verify Code auth : two factor auth with email
class CodeAuthView(APIView):
    def post(self,request, pk):
        if pk:
            try:
                user = userModel.objects.get(id=pk)
                code = user.codeauth
            except:
                return Response(404)

            if str(code) == request.data['number']:
                return Response(200)

        return Response(404)









import datetime
import json
import os

import jwt
from django.contrib.auth.hashers import check_password
from django.db.models import Count
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed
from .models import userModel, archiveUser, dataScraper, codeauth, mission, newsletter, website, qualification, \
    archiveWebsite, archiveQualification, archiveMission, credentials, archiveCredentials, notification
from .serializers import UserSerializer, SuperUserSerializer, ChangePasswordSerializer, DataScraperSerializer, \
    CodeAuthSerializer, NewsletterSerializer, WebsiteSerializer, QualificationSerializer, MissionSerializer, \
    CredentialSerializer, NotificationSerializer
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


# One admin - GET with id

class GetUserQualification(APIView):
    def post(self, request):
        admin = userModel.objects.get(pk=request.data['id'])
        serilizerAdmin = SuperUserSerializer(admin)
        return Response(serilizerAdmin.data)



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



# Statistique des datas
# la vue va retourner une response : nbr data scraper, nbr de mission, nbr agent
class statistique(APIView):
    def get(self, request):
        nbrsite = len(website.objects.all())
        nbroffre = len(dataScraper.objects.all())
        nbrmission = len(mission.objects.all())

        return Response({'statsite': nbrsite, 'statoffre': nbroffre, 'statmission': nbrmission})




# Newsletter Get et Post
class newsletterView(APIView):
    def get(self, request):
        data = newsletter.objects.all()
        serializerNewsletter = NewsletterSerializer(data, many=True)

        return Response(serializerNewsletter.data)

    def post(self, request):
        email = request.data['email']
        try:
            exist = newsletter.objects.get(emailInscrit=email)
            return Response(404)
        except:
            try:
                user = userModel.objects.get(email=email)
                news = newsletter.objects.create(emailInscrit=email, user=user)
            except:
                news = newsletter.objects.create(emailInscrit=email)

        news.save()

        return Response(200)

# delete newsletter
class deleteNewsletter(APIView):
    def post(self, request):
        email = request.data['email']
        try:
            news = newsletter.objects.get(emailInscrit=email)
        except:
            return Response(404)

        news.delete()

        return Response(200)






# Website Get et Post
class websiteView(APIView):
    def get(self, request):
        data = website.objects.all()
        serializerWebsite = WebsiteSerializer(data, many=True)

        return Response(serializerWebsite.data)

    def post(self, request):
        url = request.data['url']
        try:
            exist = website.objects.get(url=url)
        except website.DoesNotExist:
            serializerWebsite = WebsiteSerializer(data=request.data)
            if serializerWebsite.is_valid():
                serializerWebsite.save()
                return Response(200)
        except:
            return Response(500)

        return Response(404)


# delete website
class archivWebsite(APIView):
    def post(self, request):
        url = request.data['url']
        try:
            site = website.objects.get(url=url)
        except:
            return Response(404)

        archiveWebsite.objects.create(url=site.url, description=site.description)
        site.delete()

        return Response(200)




# All Data Scraper

class DataScraperView(APIView):
    def get(self, request):
        data = dataScraper.objects.all()
        serializerDatascraper = DataScraperSerializer(data, many=True)

        return Response(serializerDatascraper.data)



# Get One Data Scraper with id

class GetDataScraper(APIView):
    def post(self, request):
        data = dataScraper.objects.get(pk=request.data ['id'])
        serializerDatascraper = DataScraperSerializer(data)

        return Response(serializerDatascraper.data)



# Log data scraper n8n
class logdatascraperView(APIView):
    def get(self,request):
        dir_path = os.path.dirname(os.path.realpath(__file__))
        filename = os.path.join(dir_path, 'scraping_from_n8n.log')
        line = 0
        document = {}
        with open(filename, "r") as filout:
            for row in filout:
                document[line] = row.replace("\n", "")
                line = line + 1
        return Response(document)

# mission
class missionView(APIView):
    def get(self, request):
        missions = mission.objects.all()
        serializerMission = MissionSerializer(missions, many=True)

        return Response(serializerMission.data)
    def post(self, request):
        try:
            cible = mission.objects.get(description=request.data['description'])
        except mission.DoesNotExist:
            serializerMission = MissionSerializer(data=request.data)
            if serializerMission.is_valid():
                serializerMission.save()
                return Response(200)

        return Response(404)



# Archive mission
class archivMission(APIView):
    def post(self, request):
        pk = request.data['id']

        try:
            cible = mission.objects.get(pk=pk)
        except:
            return Response(404)

        archiveMission.objects.create(description=cible.description, datemission=cible.datemission)

        cible.delete()

        return Response(200)



# Update mission
class updateMission(APIView):
    def post(self, request):
        try:
            cible = mission.objects.get(pk=request.data['id'])
        except:
            return Response(404)


        serializerMission = MissionSerializer(cible, data=request.data)
        if serializerMission.is_valid():
            serializerMission.save()
            return Response(200)

        return Response(404)






# credentials
class credentialView(APIView):
    def get(self, request):
        creds = credentials.objects.all()
        serializerCreds = CredentialSerializer(creds, many=True)

        return Response(serializerCreds.data)

    def post(self, request):
        serializerCreds = CredentialSerializer(data=request.data)
        if serializerCreds.is_valid():
            serializerCreds.save()
            return Response(200)

        return Response(404)



# update credentials
class updateCredentials(APIView):
    def post(self, request):
        try:
            cred = credentials.objects.get(pk=request.data['id'])
        except:
            return Response(404)

        serilizerCred = CredentialSerializer(cred, data=request.data)
        if serilizerCred.is_valid():
            serilizerCred.save()
            return Response(200)

        return Response(404)


# archive credentials
class archivCredential(APIView):
    def post(self,request):
        pk = request.data['id']
        try:
            cible = credentials.objects.get(pk=pk)
        except:
            return Response(404)

        archiveCredentials.objects.create(type=cible.type, montant=cible.montant, duree=cible.duree, contactclient=cible.contactclient,equipe=cible.equipe,proposition=cible.proposition, rapportfinal=cible.rapportfinal, datecredential=cible.datecredential)

        cible.delete()

        return Response(200)


# notification
class notificationView(APIView):
    def get(self,request):
        notifs = notification.objects.filter(newnotif=True)
        serializerNotifs = NotificationSerializer(notifs, many=True)

        return Response(serializerNotifs.data)



# qualification
class qualificationView(APIView):
    def get(self, request):
        qualifs = qualification.objects.all()
        serializerQualif = QualificationSerializer(qualifs, many=True)

        return Response(serializerQualif.data)
    def post(self, request):
        try:
            data = dataScraper.objects.get(pk=request.data['datareference'])
        except:
            return Response(404)

        try:
            qualif = qualification.objects.get(datareference=data.id)
        except qualification.DoesNotExist:
            serializerQualification = QualificationSerializer(data=request.data)
            if serializerQualification.is_valid():
                serializerQualification.save()
                return Response(200)

        return Response(404)


# update qualification
class updateQualification(APIView):
    def post(self, request):
        try:
            qualif = qualification.objects.get(pk=request.data['id'])
        except:
            return Response(404)

        serializerQualification = QualificationSerializer(qualif, data=request.data)
        if serializerQualification.is_valid():
            serializerQualification.save()
            return Response(200)

        return Response(404)


# archive qualification
class archivQualification(APIView):
    def post(self, request):
        pk = request.data['id']
        try:
            qualif = qualification.objects.get(pk=pk)
        except:
            return Response(404)

        archiveQualification.objects.create(isopportunity=qualif.isopportunity, typeopportunity=qualif.typeopportunity, proposition=qualif.proposition, datequalification=qualif.isopportunity)

        qualif.delete()

        return Response(200)

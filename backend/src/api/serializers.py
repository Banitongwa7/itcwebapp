from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from api.models import userModel, dataScraper, newsletter, website, qualification, mission, credentials, notification, codeauth




# serializer agent

class UserSerializer(serializers.ModelSerializer):

    picture = serializers.ImageField(required=False)
    password = serializers.CharField(required=False)

    class Meta:
        model = userModel
        fields = ['id', 'full_name', 'email', 'picture', 'phone', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = userModel.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        for k, v in validated_data.items():
            if k == 'full_name':
                instance.full_name = v

            if k == 'email':
                instance.email = v

            if k == 'phone':
                instance.phone = v

            if k == 'picture':
                instance.picture = v

            if k == 'password':
                instance.password = make_password(v)

        instance.save()
        return instance



# serializer superuser

class SuperUserSerializer(serializers.ModelSerializer):
    picture = serializers.ImageField(required=False)
    class Meta:
        model = userModel
        fields = ['id', 'full_name', 'email','picture' , 'phone', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = userModel.objects.create_superuser(**validated_data)
        return user

    def update(self, instance, validated_data):
        for k, v in validated_data.items():
            if k == 'full_name':
                instance.full_name = v

            if k == 'email':
                instance.email = v

            if k == 'phone':
                instance.phone = v

            if k == 'picture':
                instance.picture = v

            if k == 'password':
                instance.password = make_password(v)

        instance.save()
        return instance



# serializer datascraping

class DataScraperSerializer(serializers.ModelSerializer):
    class Meta:
        model = dataScraper
        fields = '__all__'

    def create(self, validated_data):
        data = dataScraper.objects.create(**validated_data)
        return data



# serializer change password

class ChangePasswordSerializer(serializers.ModelSerializer):
    email = serializers.CharField(required=False)
    class Meta:
        model = userModel
        fields = ['id', 'full_name', 'email', 'picture', 'phone', 'password']

    def update(self, instance, validated_data):
        instance.password = make_password(validated_data['password'])
        instance.save()
        return instance


# serializer Newsletter

class NewsletterSerializer(serializers.ModelSerializer):
    class Meta:
        model = newsletter
        fields = '__all__'



# serializer website

class WebsiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = website
        fields = '__all__'



# serializer qualification

class QualificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = qualification
        fields = '__all__'



# serializer mission

class MissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = mission
        fields = '__all__'



# serializer credentials

class CredentialSerializer(serializers.ModelSerializer):
    class Meta:
        model = credentials
        fields = '__all__'




# serializer notification

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = notification
        fields = '__all__'


"""
class CodeAuthSerializer(serializers.ModelSerializer):
    class Meta:
        model = codeauth
        fields = ['number']

"""




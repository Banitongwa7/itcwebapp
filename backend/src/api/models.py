import random
from django.db.models.signals import post_save
from django.dispatch import receiver

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

# Create your models here.
from django.utils import timezone


def upload_path(instance, filename):
    extension = filename.rsplit(".", 1)
    code = str(random.randrange(5000))
    changeName = str(instance.full_name).replace(" ", "_") + "_" + code + "." + extension[1]
    return changeName

class CustomAccountManager(BaseUserManager):
    def create_superuser(self,full_name, phone, email, password, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser doit avoir is_staff=True')

        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser doit avoir is_superuser=True')

        return self.create_user(full_name, phone, email, password, **other_fields)

    def create_user(self,full_name, phone, email, password, **other_fields):

        if not email:
            raise ValueError('Le champ Email ne doit pas être vide')

        email = self.normalize_email(email)
        other_fields.setdefault('is_active', True)
        user = self.model(full_name=full_name, email=email, phone=phone, **other_fields)
        user.set_password(password)
        user.save()
        return user



# Model for User

class userModel(AbstractBaseUser, PermissionsMixin):
    full_name = models.CharField(max_length=300, blank=True)
    email = models.CharField(max_length=300, unique=True)
    phone = models.CharField(max_length=20, blank=True)
    picture = models.ImageField(default='default.jpg', blank=True, upload_to=upload_path)
    start_date = models.DateField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name','phone']

    def __str__(self):
        return self.full_name



# Model for Archive User

class archiveUser(models.Model):
    full_name = models.CharField(max_length=300, blank=True)
    email = models.CharField(max_length=300, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)


# Model for website

class website(models.Model):
    description = models.TextField(blank=True)
    url = models.TextField(blank=True)
    number = models.TextField(blank=True, default=0)
"""
    def save(self, *args, **kwargs):
        try:
            self.number = str(len(dataScraper.objects.filter(origindata=self.url)))
        except:
            self.number = str(0)
        super().save(*args, **kwargs)
"""


# Model for Archive website
class archiveWebsite(models.Model):
    description = models.TextField()
    url = models.TextField()

# Model Data from Scraping

class dataScraper(models.Model):
    titre = models.TextField(blank=True)
    urldata = models.TextField()
    origindata = models.TextField()
    content = models.TextField(blank=False)
    datescraping = models.DateField(auto_now_add=True)
    dataprovider = models.ForeignKey(website, on_delete=models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        try:
            site = website.objects.get(url=self.origindata)
            self.titre = site.description
            self.dataprovider = site
        except:
            pass
        super().save(*args, **kwargs)



# Model for Newsletter

class newsletter(models.Model):
    fullname = models.CharField(max_length=300, blank=True)
    emailInscrit = models.CharField(max_length=300, unique=True)
    user = models.ForeignKey(userModel, on_delete=models.SET_NULL, null=True)

    def save(self, *args, **kwargs):
        try:
            self.fullname = self.user.full_name
        except:
            self.fullname = "Inconnu"
        super().save(*args, **kwargs)





# Model for Qualification

class qualification(models.Model):
    isopportunity = models.BooleanField(blank=True)
    typeopportunity = models.TextField(blank=True)
    proposition = models.TextField(blank=True)
    datequalification = models.DateField(auto_now_add=True)
    userqualification = models.ForeignKey(userModel, on_delete=models.SET_NULL, null=True)
    datareference = models.ForeignKey(dataScraper, on_delete=models.SET_NULL, null=True)


# Model for Archive Qualification
class archiveQualification(models.Model):
    isopportunity = models.BooleanField(blank=False)
    typeopportunity = models.TextField(blank=False)
    proposition = models.TextField(blank=True)
    datequalification = models.DateField(auto_now_add=True)




# Model for Mission

class mission(models.Model):
    description = models.TextField()
    lastupdate = models.DateTimeField(auto_now=True, null=True)
    datemission = models.DateField(auto_now_add=True)


# Model for Archive Mission
class archiveMission(models.Model):
    description = models.TextField()
    datemission = models.DateField(null=True)



# Model for Credential

class credentials(models.Model):
    type = models.TextField(blank=True)
    montant = models.TextField(blank=True)
    duree = models.TextField(blank=True)
    contactclient = models.TextField(blank=True)
    equipe = models.TextField(blank=True)
    proposition = models.TextField(blank=True)
    rapportfinal = models.TextField(blank=True)
    datecredential = models.DateField(auto_now_add=True)
    lastupdate = models.DateTimeField(auto_now=True, null=True)


class archiveCredentials(models.Model):
    type = models.TextField(blank=True)
    montant = models.TextField(blank=True)
    duree = models.TextField(blank=True)
    contactclient = models.TextField(blank=True)
    equipe = models.TextField(blank=True)
    proposition = models.TextField(blank=True)
    rapportfinal = models.TextField(blank=True)
    datecredential = models.DateField(null=True)


# Model for Notification

class notification(models.Model):
    number = models.TextField()
    website = models.TextField()
    newnotif = models.BooleanField(default=True)
    time = models.TimeField(auto_now_add=True)
    datenotification = models.DateField(auto_now_add=True)


# Code for two factor auth with email

class codeauth(models.Model):
    number = models.CharField(max_length=5, blank=True,)
    user = models.OneToOneField(userModel, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.number)

    def save(self, *args, **kwargs):
        number_list = [x for x in range(10)]
        code_items = []

        for i in range(5):
            num = random.choice(number_list)
            code_items.append(num)

        code_string = "".join(str(item) for item in code_items)
        self.number = code_string
        super().save(*args, **kwargs)




# update number of website when datascraper is created

@receiver(post_save, sender=dataScraper)
def post_save_update_number(sender, instance, created, *args, **kwargs):
    if created:
        try:
            site = website.objects.get(url=instance.origindata)
            site.number = str(int(site.number) + 1)
            site.save()
        except:
            pass

# Generated by Django 4.0.4 on 2022-05-02 21:31

import api.models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='userModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('full_name', models.CharField(blank=True, max_length=300)),
                ('email', models.CharField(max_length=300, unique=True)),
                ('phone', models.CharField(blank=True, max_length=20)),
                ('picture', models.ImageField(blank=True, default='default.jpg', upload_to=api.models.upload_path)),
                ('start_date', models.DateField(auto_now_add=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='archiveCredentials',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.TextField(blank=True)),
                ('montant', models.TextField(blank=True)),
                ('duree', models.TextField(blank=True)),
                ('contactclient', models.TextField(blank=True)),
                ('equipe', models.TextField(blank=True)),
                ('proposition', models.TextField(blank=True)),
                ('rapportfinal', models.TextField(blank=True)),
                ('datecredential', models.DateField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='archiveMission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('datemission', models.DateField(null=True)),
            ],
        ),
        migrations.CreateModel(
            name='archiveQualification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isopportunity', models.BooleanField()),
                ('typeopportunity', models.TextField()),
                ('proposition', models.TextField(blank=True)),
                ('datequalification', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='archiveUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(blank=True, max_length=300)),
                ('email', models.CharField(blank=True, max_length=300)),
                ('phone', models.CharField(blank=True, max_length=20)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='archiveWebsite',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('url', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='credentials',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.TextField(blank=True)),
                ('montant', models.TextField(blank=True)),
                ('duree', models.TextField(blank=True)),
                ('contactclient', models.TextField(blank=True)),
                ('equipe', models.TextField(blank=True)),
                ('proposition', models.TextField(blank=True)),
                ('rapportfinal', models.TextField(blank=True)),
                ('datecredential', models.DateField(auto_now_add=True)),
                ('lastupdate', models.DateTimeField(auto_now=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='dataScraper',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.TextField(blank=True)),
                ('urldata', models.TextField()),
                ('origindata', models.TextField()),
                ('content', models.TextField()),
                ('datescraping', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='mission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('lastupdate', models.DateTimeField(auto_now=True, null=True)),
                ('datemission', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.TextField()),
                ('website', models.TextField()),
                ('newnotif', models.BooleanField(default=True)),
                ('time', models.TimeField(auto_now_add=True)),
                ('datenotification', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='website',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(blank=True)),
                ('url', models.TextField(blank=True)),
                ('number', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='qualification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isopportunity', models.BooleanField(blank=True)),
                ('typeopportunity', models.TextField(blank=True)),
                ('proposition', models.TextField(blank=True)),
                ('datequalification', models.DateField(auto_now_add=True)),
                ('datareference', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.datascraper')),
                ('userqualification', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='newsletter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullname', models.CharField(blank=True, max_length=300)),
                ('emailInscrit', models.CharField(max_length=300, unique=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='datascraper',
            name='dataprovider',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.website'),
        ),
        migrations.CreateModel(
            name='codeauth',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(blank=True, max_length=5)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

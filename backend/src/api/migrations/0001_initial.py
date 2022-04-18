# Generated by Django 4.0.3 on 2022-04-08 19:13

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


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
                ('picture', models.ImageField(blank=True, default='default.jpg', upload_to='picprofile')),
                ('start_date', models.DateTimeField(default=django.utils.timezone.now)),
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
            name='credentials',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.TextField()),
                ('montant', models.TextField()),
                ('duree', models.TextField()),
                ('contactclient', models.TextField()),
                ('equipe', models.TextField()),
                ('proposition', models.TextField()),
                ('rapportfinal', models.TextField()),
                ('datecredential', models.DateField(default=datetime.date.today)),
            ],
        ),
        migrations.CreateModel(
            name='dataScraper',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('urlData', models.URLField(max_length=500)),
                ('originData', models.URLField(max_length=500)),
                ('content', models.TextField()),
                ('dateScraping', models.DateField(default=datetime.date.today)),
            ],
        ),
        migrations.CreateModel(
            name='mission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('datemission', models.DateField(default=datetime.date.today)),
            ],
        ),
        migrations.CreateModel(
            name='newsletter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('emailInscrit', models.CharField(max_length=300, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='website',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('url', models.URLField(max_length=500)),
            ],
        ),
        migrations.CreateModel(
            name='qualification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isopportunity', models.BooleanField()),
                ('typeopportunity', models.TextField()),
                ('proposition', models.TextField(blank=True)),
                ('datequalification', models.DateField(default=datetime.date.today)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('datenotification', models.DateField(default=datetime.date.today)),
                ('content', models.ManyToManyField(to='api.datascraper')),
            ],
        ),
    ]

# Generated by Django 4.0.3 on 2022-04-14 00:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_usermodel_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usermodel',
            name='picture',
            field=models.ImageField(blank=True, default='default.jpg', upload_to=''),
        ),
    ]

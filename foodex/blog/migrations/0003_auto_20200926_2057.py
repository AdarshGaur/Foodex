# Generated by Django 3.1.1 on 2020-09-26 15:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20200926_2005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='otpmodel',
            name='at_time',
            field=models.IntegerField(),
        ),
    ]
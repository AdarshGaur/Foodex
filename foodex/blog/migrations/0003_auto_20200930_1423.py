# Generated by Django 3.1.1 on 2020-09-30 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0002_auto_20200930_1317'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='modified_on',
            field=models.DateTimeField(),
        ),
    ]

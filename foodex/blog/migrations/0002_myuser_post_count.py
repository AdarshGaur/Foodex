# Generated by Django 3.1.2 on 2020-10-08 22:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='myuser',
            name='post_count',
            field=models.PositiveIntegerField(default=0),
        ),
    ]

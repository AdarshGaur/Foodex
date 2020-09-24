import uuid
import re
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.urls import path, re_path
from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator


class Recipe(models.Model):
    title  = models.CharField(max_length=50)
    content = models.TextField(blank=False)
    #Keywords  = models.CharField(max_length=100)
    #thumbnail = models.ImageField()
    #images    = models.ImageField(upload_to='media', null=False, blank=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='blog', on_delete=models.CASCADE)
    published_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)
    read_time = models.IntegerField()
    yums = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    slug = models.SlugField(blank=True, unique=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['published_on']



class MyUser(AbstractUser):
    #regeX validators
    alphaSpaces = RegexValidator('^[a-zA-Z ]+$', 'Only letters and spaces are allowed in Name.')
    emailaddresses = RegexValidator('^[a-zA-Z0-9]+([-._][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,7}$', 'Invalid Email Address')


    name = models.CharField(blank=False, max_length=50, null=False, validators=[alphaSpaces])
    recipemagic = models.IntegerField(default=1, editable=False,)
    followers = models.PositiveIntegerField(default=1, editable=False,)
    following = models.PositiveIntegerField(default=1, editable=False,)
    age = models.PositiveIntegerField(default=22, blank=False, null=False, validators=[MaxValueValidator(110), MinValueValidator(5)])
    email = models.EmailField(blank=False, unique=True, null=False, validators=[emailaddresses])
    is_active = models.BooleanField(default=False)
    username = models.CharField(max_length=50)
    #logged_in = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'age',]

    def __str__(self):
        return self.email



class OtpModel(models.Model):
    otp = models.PositiveIntegerField()
    count = models.IntegerField(default=0)
    email = models.EmailField(blank=False)
    verified = models.BooleanField(default=False)
    validity_period = models.DateTimeField()
    #expired = models.DateTimeField(auto_now_add=True)







import uuid
import re

from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator


class Recipe(models.Model):
    title  = models.CharField(max_length=50)
    content = models.TextField(blank=False)
    ingredients = models.TextField(blank=False, null=False)
    category = models.TextChoices()
    #Keywords  = models.CharField(max_length=100)
    #thumbnail = models.ImageField()
    #images    = models.ImageField(upload_to='media', null=False, blank=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='blog', on_delete=models.CASCADE)
    published_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)
    cook_time = models.IntegerField(validators=[MinValueValidator(1)])
    yums = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    slug = models.SlugField(blank=True, unique=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['published_on']



class MyUser(AbstractUser):

    #regeX validators
    name_regex = RegexValidator('^[a-zA-Z ]+$', 'Only letters and spaces are allowed in Name.')
    email_regex = RegexValidator('^[a-zA-Z0-9]+([-._][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,7}$', 'Invalid Email Address')
    password_regex = RegexValidator("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$", "Invalid Password")


    name = models.CharField(blank=False, max_length=50, null=False, validators=[name_regex])
    recipemagic = models.IntegerField(default=0,)
    followers = models.PositiveIntegerField(default=0,)
    following = models.PositiveIntegerField(default=0,)
    age = models.PositiveIntegerField(default=22, blank=False, validators=[MaxValueValidator(110), MinValueValidator(5)])
    email = models.EmailField(blank=False, unique=True, validators=[email_regex])
    is_active = models.BooleanField(default=False,)
    username = models.CharField(max_length=50, unique=False,)
    password = models.CharField(blank=False, max_length=21, validators=[password_regex])
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'age', 'password', 'username']

    def __str__(self):
        return self.email



class OtpModel(models.Model):
    otp = models.PositiveIntegerField()
    email = models.EmailField(blank=False)
    at_time = models.TimeField()








from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

from django.core.validators import MaxValueValidator, MinValueValidator


class Recipe(models.Model):
    title  = models.CharField(max_length=50)
    content = models.TextField(blank=False)
    #Keywords  = models.CharField(max_length=100)
    #thumbnail = models.ImageField()
    #images    = models.ImageField(upload_to='media', null=False, blank=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='blog', on_delete=models.CASCADE)
    published_on = models.DateTimeField(auto_now_add=True)
    #modified_on = models.DateTimeField(auto_now=True, auto_now_add=False)
    read_time = models.IntegerField()
    #yumms = models.IntegerField(default=0,)
    #slug = models.SlugField(blank=True, unique=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['published_on']



class MyUser(AbstractUser):
    name = models.CharField(blank=False, max_length=50, null=False)
    #recipemagic = models.IntegerField(default=1, editable=False,)
    #followers = models.PositiveIntegerField(default=1, editable=False,)
    #following = models.PositiveIntegerField(default=1, editable=False,)
    age = models.PositiveIntegerField(default=22, blank=False, null=False, validators=[MaxValueValidator(110), MinValueValidator(5)])
    ##username = models.CharField(blank=False, unique=True)
    email = models.EmailField(blank=False, unique=True, null=False)
    is_active = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'age',]

    def __str__(self):
        return self.email


class OtpModel(models.Model):
    otp = models.PositiveIntegerField(max_length=6)
    count = models.IntegerField(default=0)
    ver_email = models.EmailField(blank=False)
    verified = models.BooleanField(default=False)
    #expired = models.DateTimeField(auto_now_add=True)



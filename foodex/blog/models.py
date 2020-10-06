import uuid
import re

from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

from django.core.exceptions import ValidationError
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator


categories_choices = [
    ('starter', 'Starters'),
    ('main_course', "Main Course"),
    ('desserts','Desserts'),
    ('drinks','Drinks & Smoothies'),
    ('others', 'Others'),
]


def upload_path(instance, filename):
    # do a test for instace.title
    return '/'.join(['image', instance.title, filename])
    '''can include more specific path later'''


def user_upload_path(instance, filename):
    #
    return '/'.join(['users_image', instance.email, filename])


class Recipe(models.Model):
    #recipe_id = models.AutoField(primary_key=True)
    title  = models.CharField(max_length=50)
    ingredients = models.TextField(blank=False, null=False)
    content = models.TextField(blank=False)
    category = models.TextField(default='Starters', choices=categories_choices)
    veg = models.BooleanField()
    cook_time = models.PositiveIntegerField()
    read_time = models.PositiveIntegerField(default=5)
    img = models.ImageField(upload_to=upload_path, null=True, blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='recipes', on_delete=models.CASCADE)
    published_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)
    points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-published_on']



class MyUser(AbstractUser):

    #regeX validators
    name_regex = RegexValidator('^[a-zA-Z ]+$', 'Only letters and spaces are allowed in Name.')
    email_regex = RegexValidator('^[a-zA-Z0-9]+([-._][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,7}$', 'Invalid Email Address')
    password_regex = RegexValidator("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$", "Invalid Password")



    name = models.CharField(blank=False, max_length=50, validators=[name_regex])
    #recipemagic = models.PositiveIntegerField(default=0)
    followers = models.PositiveIntegerField(default=0)
    following = models.PositiveIntegerField(default=0)
    image_user = models.ImageField(upload_to=user_upload_path, default='default-avatar.png')
    age = models.IntegerField(default=22, blank=False, validators=[MaxValueValidator(100), MinValueValidator(5)])
    email = models.EmailField(blank=False, unique=True, validators=[email_regex])
    #is_active = models.BooleanField(default=False)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(blank=False, max_length=21, validators=[password_regex])
    bookmark_count = models.PositiveIntegerField(default=0)
    posts = models.IntegerField(default=0)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'username', 'password']

    def __str__(self):
        return self.name



class OtpModel(models.Model):
    otp = models.IntegerField()
    email = models.EmailField(blank=False)
    at_time = models.IntegerField()





class LikeSystem(models.Model):
    #id = models.AutoField(primary_key=True)
    active = models.IntegerField()
    liked_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='likes', on_delete=models.CASCADE)
    like_to = models.ForeignKey(Recipe, on_delete=models.CASCADE)





class BookmarkRecord(models.Model):
    #id = models.AutoField(primary_key=True)
    active = models.IntegerField()
    bookmarked_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='bookmarked', on_delete=models.CASCADE)
    bookmark_to = models.ForeignKey(Recipe, on_delete=models.CASCADE)







import uuid
import re

from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager

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
    img = models.ImageField(upload_to=upload_path, null=False, blank=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='recipes', on_delete=models.CASCADE)
    published_on = models.DateTimeField(auto_now_add=True)
    modified_on = models.DateTimeField(auto_now=True)
    points = models.PositiveIntegerField(default=0)
    like_is = models.BooleanField(default=False)
    bookmark_is = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-published_on']






class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self._create_user(email, password, **extra_fields)







class MyUser(AbstractUser):

    #regeX validators
    name_regex = RegexValidator('^[a-zA-Z ]+$', 'Only letters and spaces are allowed in Name.')
    email_regex = RegexValidator('^[a-zA-Z0-9]+([-._][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,7}$', 'Invalid Email Address')
    
    username=models.CharField(max_length=200,unique=False)
    email=models.EmailField(max_length=200,unique=True,help_text='Required',  validators=[email_regex])
    
    name = models.CharField(blank=False, max_length=50, validators=[name_regex])
    #recipemagic = models.PositiveIntegerField(default=0)
    followers = models.PositiveIntegerField(default=0)
    following = models.PositiveIntegerField(default=0)
    image_user = models.ImageField(upload_to=user_upload_path, default='default-avatar.png')
    age = models.IntegerField(default=22, blank=False, validators=[MaxValueValidator(110), MinValueValidator(5)])
    
    # email = models.EmailField(blank=False, unique=True, validators=[email_regex])
    # is_active = models.BooleanField(default=False)
    
    # password = models.CharField(blank=False, max_length=21, validators=[password_regex])

    bookmark_count = models.PositiveIntegerField(default=0)
    #post

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'age']

    objects = UserManager()

    def __str__(self):
        return self.email



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







from django.db import models

from django.utils.text import slugify
#from foodex import settings
from django.contrib.auth.models import User


class Recipe(models.Model):
    title      = models.CharField(max_length=50)
    body       = models.TextField(blank=False)
    Keywords   = models.CharField(max_length=100)
    #images    = models.ImageField(upload_to='media', null=False, blank=False)
    #author    = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    slug       = models.SlugField(blank=True, unique=True)

    def __str__(self):
        return self.title

    class meta:
        ordering = ['-created_on']



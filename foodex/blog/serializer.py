from .models import Recipe
from rest_framework import serializers


class RecipeSerializer(serializers.ModelSerializer):
    class meta:
        model = Recipe
        fields = ['id', 'title', 'body', 'keywords', 'created_on',]



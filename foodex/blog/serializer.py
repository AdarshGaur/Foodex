from .models import Recipe
from rest_framework import serializers
from django.contrib.auth.models import User


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'body','published_on', 'read_time',]

class UserSerializer(serializers.ModelSerializer):
    recipes = serializers.PrimaryKeyRelatedField(many=True, queryset = Recipe.objects.all())
    class Meta:
        model = User
        fields = ['id', 'username', 'Recipe']



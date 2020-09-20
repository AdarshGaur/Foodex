from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from blog.models import Recipe
from blog.serializer import RecipeSerializer

#only for get request atleast for now
@api_view(['GET',])
def recipe_view(request, id):

    #check if the recipe_post exists or not
    try:
        recipe_post = Recipe.objects.get(id=id)
    except Recipe.DoesNotExist:
        return Response(status=status.Http_404_Not_Found)

    #after getting the recipe-post
    #return the serialized data
    serializer = RecipeSerializer(recipe_post)
    return Response(serializer.data)



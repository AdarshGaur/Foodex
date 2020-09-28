from django.shortcuts import render

from rest_framework import status, permissions
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Recipe, MyUser
from .serializer import RecipeSerializer
from rest_framework import serializers


class CardViews(APIView):

    def get(self, request, format=None):
        
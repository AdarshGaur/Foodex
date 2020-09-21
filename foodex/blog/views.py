from django.shortcuts import render

from rest_framework import status, permissions, generics
from .models import Recipe
from .serializer import RecipeSerializer, UserSerializer

from django.contrib.auth.models import User
from .permissions import IsOwnerOrReadOnly


class RecipeList(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    print('working1')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,]
    print('working2')
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    print('working3')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly,]
    print('working4')

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


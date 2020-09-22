from django.shortcuts import render

from rest_framework import status, permissions, generics
from .models import Recipe, MyUser
from .serializer import RecipeSerializer, MyUserSerializer, RegisterSerializer

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



class MyUserList(generics.ListAPIView):
    print("userlist:b")
    queryset = MyUser.objects.all()
    print("userlist:a")
    permission_classes = [permissions.AllowAny]
    serializer_class = MyUserSerializer



class MyUserDetail(generics.RetrieveAPIView):
    print("userdetail:b")
    queryset = MyUser.objects.all()
    print("userdetail:a")
    serializer_class = MyUserSerializer



class CreateUser(generics.CreateAPIView):
    user = MyUser
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer




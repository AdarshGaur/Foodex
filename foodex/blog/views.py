import random
import time

from django.shortcuts import render

from rest_framework import status, permissions
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Recipe, MyUser, OtpModel
from .serializer import RecipeSerializer, MyUserSerializer, RegisterMyUser
from rest_framework import serializers

from .permissions import IsOwnerOrReadOnly

from django.conf import settings
from django.core.mail import send_mail



class RecipeList(APIView):
    permission_classes = [permissions.AllowAny]

    #to get all the recipes
    def get(self, request, format=None):
        recipe = Recipe.objects.all()
        serializer = RecipeSerializer(recipe, many=True)
        return Response(serializer.data)

    #to create recipe blog
    def post(self, request):
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class RecipeDetail(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    #to get the recipe
    def get_object(self, pk):
        try:
            return Recipe.objects.get(pk=pk)
        except Recipe.DoesNotExist:
            raise Http404

    #to retrieve
    def get(self, request, pk, format=None):
        recipe = self.get_object(pk)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data)


    #to update
    def put(self, request, pk, format=None):
        recipe = self.get_object(pk)
        serializer = RecipeSerializer(recipe, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_406_NOT_ACCEPTABLE)

    #to delete
    def delete(self, request, pk, format=None):
        recipe = self.get_object(pk)
        recipe.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)




class MyUserList(APIView):
    permission_classes = [permissions.AllowAny]

    #to get the users list
    def get(self, request, format=None):
        users = MyUser.objects.all()
        serializer = MyUserSerializer(users, many=True)
        return Response(serializer.data)



class MyUserDetail(APIView):
    permission_classes = [IsOwnerOrReadOnly]
    
    #to get the user
    def get_user(self, pk):
        try:
            return MyUser.objects.get(pk=pk)
        except MyUser.DoesNotExist:
            raise Http404
    
    #get the details
    def get(self, request, pk, format=None):
        solo_user = self.get_user(pk)
        serializer = MyUserSerializer(solo_user)
        return Response(serializer.data)

    #to update user details
    def put(self, request, pk, format=None):
        solo_user = self.get_user(pk)
        serializer = MyUserSerializer(solo_user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status = status.HTTP_406_NOT_ACCEPTABLE)



class CreateUser(APIView):
    permission_classes = [permissions.AllowAny]

    #post
    def post(self, request, format=None):

        # email_for_otp = request.data.get("email")
        # try:
        #     user = MyUser.objects.get(email=email_for_otp)
        # except

        serializer = RegisterMyUser(data=request.data)

        #extracting emial here
        email_for_otp = request.data.get("email")

        def random_with_N_digits(n):
            range_start = 10**(n-1)
            range_end = (10**n)-1
            return random.randint(range_start, range_end)

        if serializer.is_valid():
            serializer.save()

            #creating otp and saving it in otp model
            print('checkotp')
            otp = random_with_N_digits(6)
            print(otp)
            present_time = int(time.time())
            print(present_time)
            OtpModel.objects.create(otp=otp, email=email_for_otp, at_time=present_time)
            #now sending verification email now
            to_email = [email_for_otp]
            email_from = settings.EMAIL_HOST_USER
            send_mail(
                'Verify Email !',
                'Your 6 Digit Verification Pin: {} \nThank you for registering on Foodex.'.format(otp),
                email_from,
                to_email,
                fail_silently=False,
            )
            print('checkemail')
            message = {'message': 'otp_sent'}
            return Response(message, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class VerifyOTP(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        client_otp = request.data.get('otp')
        try:
            email_to_verify = OtpModel.objects.get(email__iexact=email)
        except OtpModel.DoesNotExist:
            message = {'message': 'register_first'}
            return Response(message ,status= status.HTTP_401_UNAUTHORIZED)
        print(email_to_verify.otp)
        print(client_otp)
        verifying_time = int(time.time())

        if (verifying_time - email_to_verify.at_time)>5000:
            error_detail = {'message': "otp_expired"}
            email_to_verify.delete()
            return Response(error_detail, status.HTTP_403_FORBIDDEN)

        if email_to_verify.otp != int(client_otp):
            message = {'message': 'wrong_otp'}
            return Response(message ,status = status.HTTP_401_UNAUTHORIZED)
        
        user_to_allow = MyUser.objects.get(email__iexact=email)
        user_to_allow.is_active=True
        user_to_allow.save()
        #print(user_to_allow.is_active)
        email_to_verify.delete()
        message = {'message': 'email_verified'}
        return Response(message ,status = status.HTTP_200_OK)



class LoginUser(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            login_user = MyUser.objects.get(email__iexact=email)
        except MyUser.DoesNotExist:
            message = {'message': 'User_not_found'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
        
        print(str(login_user.is_active))
        print(login_user)
        if login_user.is_active:
            if login_user.password != password:
                message = {'message': 'wrong_password'}
                return Response(message, status = status.HTTP_401_UNAUTHORIZED)
            
            message = {'message': 'user_logged_in'}
            return Response(message, status = status.HTTP_202_ACCEPTED)
        
        message = {'message': 'register_please'}
        return Response(message, status = status.HTTP_401_UNAUTHORIZED)

        #now give jwt tokens



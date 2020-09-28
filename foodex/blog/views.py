import random
import time

from django.shortcuts import render

from rest_framework import status, permissions
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Recipe, MyUser, OtpModel
from .serializer import RecipeSerializer, MyUserSerializer, RegisterMyUser, RecipeCardSerializer
from rest_framework import serializers

from .permissions import IsOwnerOrReadOnly

from django.conf import settings
from django.core.mail import send_mail

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken




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
        
        def random_with_N_digits(n):
            range_start = 10**(n-1)
            range_end = (10**n)-1
            return random.randint(range_start, range_end)
        

        email_for_otp = request.data.get("email")

        present = True

        try:
            user_exists = MyUser.objects.get(email=email_for_otp)
        except MyUser.DoesNotExist:
            present = False
             
        if present:
            if user_exists.is_active==False:
                user_exists.delete()
                user_otp = OtpModel.objects.get(email=email_for_otp)
                user_otp.delete()

        serializer = RegisterMyUser(data=request.data)
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

        if (verifying_time - email_to_verify.at_time)>300:
            error_detail = {'message': "otp_expired"}
            email_to_verify.delete()
            return Response(error_detail, status.HTTP_403_FORBIDDEN)

        if email_to_verify.otp != int(client_otp):
            message = {'message': 'wrong_otp'}
            return Response(message ,status = status.HTTP_401_UNAUTHORIZED)
        
        user_to_allow = MyUser.objects.get(email=email)
        user_to_allow.is_active=True
        user_to_allow.save()
        #print(user_to_allow.is_active)
        email_to_verify.delete()

        #getting token
        r_token = TokenObtainPairSerializer().get_token(request.user)
        a_token = AccessToken().for_user(request.user)
        tokens = {
            'refresh': str(r_token),
            'access': str(a_token)
        }
        message = {'message': 'email_verified'}
        return Response(tokens, status = status.HTTP_200_OK)



class ResendOtp(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        email = request.data.get('email')
        resend_email = OtpModel.objects.get(emial=email)
        resend_email.delete()

        def random_with_N_digits(n):
            range_start = 10**(n-1)
            range_end = (10**n)-1
            return random.randint(range_start, range_end)

        otp = random_with_N_digits(6)
        print(otp)
        present_time = int(time.time())
        OtpModel.objects.create(otp=otp, email=email, at_time=present_time)
        #now sending verification email now
        to_email = [email]
        email_from = settings.EMAIL_HOST_USER
        send_mail(
            'Verify Email !',
            'Your New 6 Digit Verification Pin: {} \nThank you for registering on Foodex.'.format(otp),
            email_from,
            to_email,
            fail_silently=False,
        )
        print('checkemail')
        message = {'message': 'otp_sent_again'}
        return Response(message, status=status.HTTP_200_OK)



class ForgotPassword(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        
        def random_with_N_digits(n):
            range_start = 10**(n-1)
            range_end = (10**n)-1
            return random.randint(range_start, range_end)
        
        email = request.data.get('email')
        
        # check if user exists or not
        try:
            change_pass_email = MyUser.objects.get(email=email)
        except MyUser.DoesNotExist:
            message = {"message": "register_first"}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)

        # check if user completed registration process
        try:
            inactive_email = OtpModel.objects.get(email=email)
        except OtpModel.DoesNotExist:
            otp = random_with_N_digits(6)
            print(otp)
            present_time = int(time.time())
            OtpModel.objects.create(otp=otp, email=email, at_time=present_time)
            #now sending verification email now
            to_email = [email]
            email_from = settings.EMAIL_HOST_USER
            send_mail(
                'Verify Email !',
                'Your 6 Digit Verification Pin: {} \nThank you for registering on Foodex.'.format(otp),
                email_from,
                to_email,
                fail_silently=False,
            )
            message = {'message': 'email_ok'}
            return Response(message, status=status.HTTP_200_OK)

        message = {"message": "complete_registration_first"}
        return Response(message, status=status.HTTP_406_NOT_ACCEPTABLE)


class ForgotPasswordOtp(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):

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

        # check otp expiration here
        if (verifying_time - email_to_verify.at_time)>5000:
            error_detail = {'message': "otp_expired"}
            email_to_verify.delete()
            return Response(error_detail, status.HTTP_403_FORBIDDEN)

        # check otp here
        if email_to_verify.otp != int(client_otp):
            message = {'message': 'wrong_otp'}              # delete opt models when resend otp either by resending or re-registering
            return Response(message ,status = status.HTTP_401_UNAUTHORIZED)
        
        user_to_allow = MyUser.objects.get(email=email)
        user_to_allow.is_active=True
        user_to_allow.save()
        #print(user_to_allow.is_active)
        email_to_verify.delete()

        #getting token
        r_token = TokenObtainPairSerializer().get_token(request.user)
        a_token = AccessToken().for_user(request.user)
        tokens = {
            'refresh': str(r_token),
            'access': str(a_token)
        }
        message = {'message': 'email_verified_now_continue'}
        return Response(tokens, status = status.HTTP_200_OK)



class NewPassword(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        
        """
        include validations here later
        """

        new_password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')

        if new_password != confirm_password:
            message = {"message": "Both passwords must match."}
            return Response(message, status=status.HTTP_406_NOT_ACCEPTABLE)

        user = request.user
        user.password = new_password
        user.save()

        #getting token
        r_token = TokenObtainPairSerializer().get_token(request.user)
        a_token = AccessToken().for_user(request.user)
        tokens = {
            'refresh': str(r_token),
            'access': str(a_token)
        }
        message = {"message": "password_changed"}
        return Response(tokens, status=status.HTTP_202_ACCEPTED)



class RecipeCardsList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, format=None):
        recipe = Recipe.objects.all()[:4]
        serializer = RecipeSerializer(recipe, many=True)
        return Response(serializer.data)

    
    def post(self, request, fomat=None):

        display_order = request.data.get('data')
        recent_or_point = request.data.get('recent_point')
        veg_non_veg = request.data.get('bool')

        #if recent_or_point comes out in reverse order then
        #recent = '-' + recent_or_point


        #########################################
        ###### sorting on homepage only #########
        #########################################
        if display_order == 'points':
            recipe = Recipe.objects.all().order_by('-points')[:4]
        elif display_order == 'veg':
            recipe = Recipe.objects.get(veg=True)[:4]
        elif display_order == 'non_veg':
            recipe = Recipe.objects.get(veg=False)[:4]
        elif display_order == 'published_on':
            recipe = Recipe.objects.all()[:4]
        
        #########################################
        ##### on staters page ###################
        #########################################
        if display_order == 'starter':
            if veg_non_veg == 'none':
                recipe = Recipe.objects.get(category='starter').order_by(recent_or_point)[:4]
            if veg_non_veg == 'true':
                recipe = Recipe.objects.get(category='starter', veg=True).order_by(recent_or_point)[:4]
            if veg_non_veg == 'false':
                recipe = Recipe.objects.get(category='starter', veg=False).order_by(recent_or_point)[:4]
        
        #########################################
        ##### on main course ####################
        #########################################
        if display_order == 'main_course':
            if veg_non_veg == 'none':
                recipe = Recipe.objects.get(category='main_course').order_by(recent_or_point)[:4]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.get(category='main_course', veg=True).order_by(recent_or_point)[:4]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.get(category='main_course', veg=False).order_by(recent_or_point)[:4]
        
        #########################################
        ######## on desserts page ###############
        #########################################
        if display_order == 'desserts':
            if veg_non_veg == 'none':
                recipe = Recipe.objects.get(category='desserts').order_by(recent_or_point)[:4]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.get(category='desserts', veg=True).order_by(recent_or_point)[:4]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.get(category='desserts', veg=False).order_by(recent_or_point)[:4]
            
        
        #########################################
        ###### on drinks page ###################
        #########################################
        if display_order == 'drinks':
            if veg_non_veg == 'none':
                recipe = Recipe.objects.get(category='drinks').order_by(recent_or_point)[:4]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.get(category='drinks', veg=True).order_by(recent_or_point)[:4]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.get(category='drinks', veg=False).order_by(recent_or_point)[:4]
        
        #########################################
        ######### for others page ###############
        #########################################
        if display_order == 'others':
            if veg_non_veg == 'none':
                recipe = Recipe.objects.get(category='others').order_by(recent_or_point)[:4]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.get(category='others', veg=True).order_by(recent_or_point)[:4]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.get(category='others', veg=False).order_by(recent_or_point)[:4]
        

        serializer = RecipeCardSerializer(recipe, many=True)
        return Response(serializer.data)


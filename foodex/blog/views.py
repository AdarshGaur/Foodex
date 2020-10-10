import random
import time

from django.shortcuts import render

from rest_framework import status, permissions
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Recipe, MyUser, OtpModel, LikeSystem, BookmarkRecord, FollowSystem
from .serializer import RecipeSerializer, MyUserSerializer, RegisterMyUser, RecipeCardSerializer, PostRecipeSerializer, MyUserDetailSerializer
from rest_framework import serializers

from .permissions import IsOwnerOrReadOnly

from django.conf import settings
from django.core.mail import send_mail

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from django.db.models import Q, F




class CreateRecipe(APIView):
    print('started')
    permission_classes = [permissions.IsAuthenticated]
    print('check1')

    def post(self, request,format=None):
        print('check2')
        owner= request.user
        serializer = PostRecipeSerializer(data=request.data)
        print('check3')
        if serializer.is_valid():
            owner.post_count = F('post_count') + 1
            owner.save()
            serializer.save(owner=owner)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RecipeDetail(APIView):
    permission_classes = [IsOwnerOrReadOnly]
    
    #function to pick the object
    def get_recipeneeded(self, pk):
        try:
            return Recipe.objects.get(pk=pk)
        except Recipe.DoesNotExist:
            raise Http404

    #to get the object
    def get(self, request, pk, format=None):
        recipe = self.get_recipeneeded(pk)

        if request.user.is_anonymous:
            recipe.like_is=False
            recipe.bookmark_is=False
            recipe.ownit=False
            recipe.save()
            serializer = RecipeSerializer(recipe, context={'request': request})
            return Response(serializer.data)


        liker = request.user
        past = False

        try:
            islike = LikeSystem.objects.get(liked_by=liker, like_to=recipe)
            past = True
        except LikeSystem.DoesNotExist:
            recipe.like_is=False
        if past:
            if islike.active == -1:
                recipe.like_is=False
            else:
                recipe.like_is=True

        bookmarker = request.user
        past = False
        try:
            isbookmark = BookmarkRecord.objects.get(bookmarked_by=bookmarker, bookmark_to=recipe)
            past = True
        except BookmarkRecord.DoesNotExist:
            recipe.bookmark_is=False
        if past:
            if isbookmark.active == -1:
                recipe.bookmark_is=False
            else:
                recipe.bookmark_is=True
            
        if recipe.owner == request.user:
            recipe.ownit = True
        
        recipe.save()
        serializer = RecipeSerializer(recipe, context={'request': request})
        return Response(serializer.data)


    #to update
    def put(self, request, pk, format=None):
        recipe = self.get_recipeneeded(pk)
        u = request.user
        self.check_object_permissions(request, recipe)
        serializer = RecipeSerializer(recipe, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status = status.HTTP_406_NOT_ACCEPTABLE)

    #to delete
    def delete(self, request, pk, format=None):
        recipe = self.get_recipeneeded(pk)
        u = request.user
        self.check_object_permissions(request, recipe)
        recipe.delete()
        # posts_count decrement
        u.post_count = F('post_count') -1
        u.save()
        message = {'message': 'deleted'}
        return Response(message, status = status.HTTP_204_NO_CONTENT)



class MyUserList(APIView):
    permission_classes=[permissions.AllowAny]
    
    def get(self, request, format=None):
        user = MyUser.objects.all()
        serializer = MyUserSerializer(user, many=True)
        return Response(serializer.data)



class MyUserDetail(APIView):
    permission_classes = [IsOwnerOrReadOnly]
    
    #to get the user
    def get_user(self, pk):
        try:
            # print(pk)
            return MyUser.objects.get(pk=pk)
        except MyUser.DoesNotExist:
            message = {'message': 'page not found'}
            return Response(message, status=status.HTTP_404_NOT_FOUND)
    
    #get the details
    def get(self, request, pk, format=None):
        print('2----------')
        # print(pk)
        solo_user = self.get_user(pk)
        serializer = MyUserDetailSerializer(solo_user, context={'request': request})
        # print(serializer)
        return Response(serializer.data)

    #to update user details
    # def put(self, request, pk, format=None):
    #     solo_user = self.get_user(pk)
    #     serializer = MyUserSerializer(solo_user, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status = status.HTTP_406_NOT_ACCEPTABLE)



class MyAccountDetail(APIView):
    permission_classes=[permissions.IsAuthenticated]

    def get(self, request):
        u = request.user
        serializer = MyUserSerializer(u, context={'request': request})
        return Response(serializer.data)




















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
        found = True
        try:
            resend_email = OtpModel.objects.get(email=email)
        except OtpModel.DoesNotExist:
            found = False
        
        if found:
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
        # r_token = TokenObtainPairSerializer().get_token(request.user)
        # a_token = AccessToken().for_user(request.user)
        # tokens = {
        #     'refresh': str(r_token),
        #     'access': str(a_token)
        # }
        message = {'message': 'email_verified_now_continue'}
        return Response(message, status = status.HTTP_200_OK)


class NewPassword(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        
        """
        include validations here later
        """
        email = request.data.get('email')
        new_password = request.data.get('password')
        confirm_password = request.data.get('confirm_password')

        if str(new_password) != str(confirm_password):
            message = {"message": "Both passwords must match."}
            return Response(message, status=status.HTTP_406_NOT_ACCEPTABLE)

        user = MyUser.objects.get(email__iexact=email)
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

    #homepage default cards
    def get(self, request, format=None):
        recipe = Recipe.objects.all()[:16]
        serializer = RecipeSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)

    
    def post(self, request, format=None):
        
        display_order = request.data.get('data')
        veg_non_veg = request.data.get('veg')

        #################################
        if display_order == 'points-high-to-low':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.all().order_by('-points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(veg=True).order_by('-points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(veg=False).order_by('-points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'points-low-to-high':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.all().order_by('points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(veg=True).order_by('points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(veg=False).order_by('points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'new':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.all().order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(veg=True).order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(veg=False).order_by('-published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'old':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.all().order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(veg=True).order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(veg=False).order_by('published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        else:
            message = {'message': 'Invalid Order'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer = RecipeCardSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)


class StartersCardsList(APIView):
    permission_classes = [permissions.AllowAny]

    # for default starter category
    def get(self, request):
        display_category = 'starter'
        recipe = Recipe.objects.filter(category=display_category)[:16]
        serializer = RecipeSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)




    def post(self, request, format=None):
        display_category = 'starter'
        display_order = request.data.get('data')
        veg_non_veg = request.data.get('veg')

        #################################
        if display_order == 'points-high-to-low':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('-points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('-points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('-points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'points-low-to-high':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'new':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('-published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'old':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)

        else:
            message = {'message': 'Invalid Order'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


        serializer = RecipeCardSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)


class MainCourseCardsList(APIView):
    permission_classes = [permissions.AllowAny]

    # for default starter category
    def get(self, request):
        display_category = 'main_course'
        recipe = Recipe.objects.filter(category=display_category)[:16]
        serializer = RecipeSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)




    def post(self, request, format=None):
        display_category = 'main_course'
        display_order = request.data.get('data')
        veg_non_veg = request.data.get('veg')

        #################################
        if display_order == 'points-high-to-low':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('-points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('-points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('-points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'points-low-to-high':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'new':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('-published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'old':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        else:
            message = {'message': 'Invalid Order'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


        serializer = RecipeCardSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)


class DessertsCardsList(APIView):
    permission_classes = [permissions.AllowAny]


    # for default starter category
    def get(self, request):
        display_category = 'desserts'
        recipe = Recipe.objects.filter(category=display_category)[:16]
        serializer = RecipeSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)




    def post(self, request, format=None):
        display_category = 'desserts'
        display_order = request.data.get('data')
        veg_non_veg = request.data.get('veg')

        #################################
        if display_order == 'points-high-to-low':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('-points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('-points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('-points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)

        elif display_order == 'points-low-to-high':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'new':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('-published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)



        elif display_order == 'old':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        else:
            message = {'message': 'Invalid Order'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


        serializer = RecipeCardSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)


class DrinksCardsList(APIView):
    permission_classes = [permissions.AllowAny]


    # for default starter category
    def get(self, request):
        display_category = 'drinks'
        recipe = Recipe.objects.filter(category=display_category)[:16]
        serializer = RecipeSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)




    def post(self, request, format=None):
        display_category = 'drinks'
        display_order = request.data.get('data')
        veg_non_veg = request.data.get('veg')

        #################################
        if display_order == 'points-high-to-low':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('-points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('-points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('-points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'points-low-to-high':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'new':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('-published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'old':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category=display_category).order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=True)).order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category=display_category) & Q(veg=False)).order_by('published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        else:
            message = {'message': 'Invalid Order'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer = RecipeCardSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)


class OthersCardsList(APIView):
    permission_classes = [permissions.AllowAny]


    # for default starter category
    def get(self, request):
        display_category = 'others'
        recipe = Recipe.objects.filter(category = display_category)[:16]
        serializer = RecipeSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)




    def post(self, request, format=None):
        display_category = 'others'
        display_order = request.data.get('data')
        veg_non_veg = request.data.get('veg')

        #################################
        if display_order == 'points-high-to-low':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category = display_category).order_by('-points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category = display_category) & Q(veg=True)).order_by('-points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category = display_category) & Q(veg=False)).order_by('-points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'points-low-to-high':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category = display_category).order_by('points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category = display_category) & Q(veg=True)).order_by('points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category = display_category) & Q(veg=False)).order_by('points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'new':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category = display_category).order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category = display_category) & Q(veg=True)).order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category = display_category) & Q(veg=False)).order_by('-published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)



        elif display_order == 'old':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.get(category = display_category).order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(category = display_category) & Q(veg=True)).order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(category = display_category) & Q(veg=False)).order_by('published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)

        else:
            message = {'message': 'Invalid Order'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer = RecipeCardSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)


class SearchCardsList(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        
        search_title = request.data.get('search')
        recipe = Recipe.objects.filter(title__icontains=search_title).order_by('?')[:16]
        serializer = RecipeCardSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)


class SortCardsList(APIView):
    permission_classes = [permissions.AllowAny]


    def post(self, request, format=None):
        
        search_title = request.data.get('search')
        display_order = request.data.get('data')
        veg_non_veg = request.data.get('veg')
        #include validations here


        #################################
        if display_order == 'points-high-to-low':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.filter(title__icontains=search_title).order_by('-points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(title__icontains=search_title) & Q(veg=True)).order_by('-points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(title__icontains=search_title) & Q(veg=False)).order_by('-points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'points-low-to-high':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.filter(title__icontains=search_title).order_by('points', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(title__icontains=search_title) & Q(veg=True)).order_by('points', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(title__icontains=search_title) & Q(veg=False)).order_by('points', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'new':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.filter(title__icontains=search_title).order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(title__icontains=search_title) & Q(veg=True)).order_by('-published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(title__icontains=search_title) & Q(veg=False)).order_by('-published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)


        elif display_order == 'old':
            if veg_non_veg == 'all':
                recipe = Recipe.objects.filter(title__icontains=search_title).order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'true':
                recipe = Recipe.objects.filter(Q(title__icontains=search_title) & Q(veg=True)).order_by('published_on', 'title')[:16]
            elif veg_non_veg == 'false':
                recipe = Recipe.objects.filter(Q(title__icontains=search_title) & Q(veg=False)).order_by('published_on', 'title')[:16]
            else:
                message = {'message': 'Invalid Tag'}
                return Response(message, status=status.HTTP_400_BAD_REQUEST)

        else:
            message = {'message': 'Invalid Order'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        serializer = RecipeCardSerializer(recipe, many=True, context={'request': request})
        return Response(serializer.data)












class CardLike(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args,**kwargs):
        
        k=request.data.get('pk')
    
        try:
            recipe = Recipe.objects.get(pk=k)
        except:
            raise Http404
        print(recipe)

        # userpk = request.data.get('my_pk')
        # try:
        #     user = MyUser.objects.get(pk=userpk)
        # except MyUser.DoesNotExist:
        #     message = {'message': 'user_must_login'}
        #     return Response(message, status=status.HTTP_401_UNAUTHORIZED)

        user = request.user

        try:
            like = LikeSystem.objects.get(Q(liked_by=user) & Q(like_to=recipe))
        except LikeSystem.DoesNotExist:
            like = LikeSystem.objects.create(liked_by=user, like_to=recipe, active=-1)

        response_data = {}

        # 1 means already liked and
        # -1 means not liked
        if like.active == -1:
            like.active = 1
            like.save()
            recipe.points = F('points') + 1
            recipe.save()
            # recipe.update(points=F('points')+1)
            response_data['message'] = 'liked'
        else:
            like.active = -1
            like.save()
            recipe.points = F('points') - 1
            recipe.save()
            # recipe.update(points=F('points')-1)
            response_data['message'] = 'unliked'


        # like_count = LikeSystem.objects.filter(Q(liked_to=recipe) & Q(active=1)).count()
        # response_data['count'] = like_count

        #print(like_count)
        #print('########################')
        print('response_data')
        #return JsonResponse(response_data)
        return Response(response_data, status=status.HTTP_200_OK)


class Bookmark(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args,**kwargs):
        # key = request.data.get('pk')
        # print(key)
        # upvoted = request.data.get('like')
        
        k=request.data.get('pk')
    
        try:
            recipe = Recipe.objects.get(pk=k)
        except:
            raise Http404
        print(recipe)

        u = request.user

        try:
            user = MyUser.objects.get(pk=u.pk)
        except MyUser.DoesNotExist:
            message = {'message': 'Sign In/Up First'}
            return Response(message, status=status.HTTP_401_UNAUTHORIZED)

        try:
            Bookmark = BookmarkRecord.objects.get(Q(bookmarked_by=user) & Q(bookmark_to=recipe))
        except BookmarkRecord.DoesNotExist:
            Bookmark = BookmarkRecord.objects.create(bookmarked_by=user, bookmark_to=recipe, active=-1)

        response_data = {}

        
        if Bookmark.active == -1:
            Bookmark.active = 1
            response_data['message'] = 'Bookmarked'
            user.bookmark_count = F('bookmark_count') +1
        else:
            Bookmark.active = -1
            response_data['message'] = 'UnBookmarked'
            user.bookmark_count = F('bookmark_count') -1
        Bookmark.save()
        user.save()

        #print(like_count)
        #print('########################')
        print('response_data')
        #return JsonResponse(response_data) 
        return Response(response_data, status=status.HTTP_200_OK)

####### debug this ########
class BookmarkList(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        k =request.user
        try:
            user = MyUser.objects.get(pk=k.pk)
        except MyUser.DoesNotExist:
            return Response({'message':'Page Not Found'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            bookmark = BookmarkRecord.objects.filter(bookmarked_by=user, acitve=1)
        except:
            pass
        
        # i = bookmark.count()
        # for i in range(0, i):
        #     queryset |= bookmark[i].bookmark_to
        serializer = RecipeCardSerializer(bookmark.bookmark_to, context={'request': request})
        print(serializer)
        return Response(serializer.data)


class MyRecipeList(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        k = request.user

        try:
            user = MyUser.objects.get(pk=k.pk)
        except MyUser.DoesNotExist:
            return Response({'message':'Page Not Found'}, status=status.HTTP_400_BAD_REQUEST)

        posts = Recipe.objects.filter(owner=user)
        
        # i = posts.count()
        # print(i)

        serializer = RecipeCardSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)


class Follow(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):

        k = request.user
        try:
            follower = MyUser.objects.get(pk=k.pk)
        except MyUser.DoesNotExist:
            return Response({'message':'Sign In/Up First'}, status=status.HTTP_401_UNAUTHORIZED)

        u = request.data.get('userpk')
        try:
            user = MyUser.objects.get(pk=u)
        except MyUser.DoesNotExist:
            return Response({'message':'Page Not Found'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            alreadyfollowed = FollowSystem.objects.get(Q(followed_by=follower) & Q(followed_to=user))
            # print(alreadyfollowed)
        except FollowSystem.DoesNotExist:
            # print('called')
            alreadyfollowed = FollowSystem.objects.create(followed_by=follower, followed_to=user, active=False)
        
        response_data = {}

        if alreadyfollowed.active==True:
            alreadyfollowed.active=False
            user.followers = F('followers') -1
            follower.following = F('following') -1
            response_data['message'] = 'Unfollowed.'
        else:
            alreadyfollowed.active=True
            user.followers = F('followers') +1
            follower.following = F('following') +1
            response_data['message'] = 'followed.'
        
        alreadyfollowed.save()
        user.save()
        follower.save()
        return Response(response_data, status=status.HTTP_200_OK)


class UserPosts(APIView):
    permission_classes = [permissions.AllowAny]

    def get_user(self, pk):
        try:
            # print(pk)
            return MyUser.objects.get(pk=pk)
        except MyUser.DoesNotExist:
            message = {'message': 'page not found'}
            return Response(message, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk, format=None):
        user = self.get_user(pk)
        posts = Recipe.objects.filter(owner=user)
        serializer = RecipeCardSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)



class Suggestion(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, format=None):
        u = request.user
        k = request.data.get('pk')
        try:
            userpost = MyUser.objects.get(pk=k)
        except MyUser.DoesNotExist:
            return Response({'message':'Bad Request.'}, status=status.HTTP_400_BAD_REQUEST)
        

        # data = request.data.get('suggestion')
        to_email = []
        email_from = settings.EMAIL_HOST_USER
        send_mail(
            'Verify Email !',
            'Your New 6 Digit Verification Pin: {} \nThank you for registering on Foodex.'.format(data),
            email_from,
            to_email,
            fail_silently=False,
        )




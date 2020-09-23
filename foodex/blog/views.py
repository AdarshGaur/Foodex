from django.shortcuts import render

from rest_framework import status, permissions
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Recipe, MyUser, OtpModel
from .serializer import RecipeSerializer, MyUserSerializer, RegisterMyUser

from .permissions import IsOwnerOrReadOnly

from django.core.mail import send_mail
import random


class RecipeList(APIView):
    def get(self, request, format=None):
        recipe = Recipe.objects.all()
        serializer = RecipeSerializer(recipe, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = RecipeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    # queryset = Recipe.objects.all()
    # serializer_class = RecipeSerializer
    # print('working1')
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly,]
    # print('working2')
    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)



class RecipeDetail(APIView):
    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()
    print('working3')
    permission_classes = [permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly,]
    print('working4')



class MyUserList(APIView):
    print("userlist:b")
    queryset = MyUser.objects.all()
    print("userlist:a")
    permission_classes = [permissions.AllowAny]
    serializer_class = MyUserSerializer



class MyUserDetail(APIView):
    print("userdetail:b")
    queryset = MyUser.objects.all()
    print("userdetail:a")
    serializer_class = MyUserSerializer



class CreateUser(APIView):
    permission_classes = [permissions.AllowAny]
    #post
    def post(self, request, format=None):
        serializer = RegisterMyUser(data=request.data)
        
        #email for otp verification and random otp generator funciton
        email_for_otp = request.data.get("email")
        def random_with_N_digits(n):
            range_start = 10**(n-1)
            range_end = (10**n)-1
            return random.randint(range_start, range_end)

        if serializer.is_valid():
            serializer.save()


            #creating otp and saving it in otp model
            otp = random_with_N_digits(6)
            OtpModel.objects.create(otp=otp, ver_email=email_for_otp)
            #now sending verification email now
            email_from = '*****'                               ####add source email here
            send_mail(
                'Verification of Email',                          # suject
                'Thank you for registering on our site.\nYour 6 Digit Verification Pin: {}'.format(otp),
                email_from,
                email_for_otp,
                fail_silently=False,
            )


            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # user = MyUser 
    # serializer_class = RegisterSerializer



class VerifyOTP(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        otp = request.data.get('otp')
        email_to_verify = OtpModel.objects.filter(email__iexact=email)
        if email_to_verify:
            if email_to_verify.otp == otp:
                user_to_allow = MyUser.objects.filter(email__iexact=email)
                user_to_allow.is_active=True
                email_to_verify.delete()

                return Response(status = status.HTTP_200_OK)
            else:
                return Response(status = status.HTTP_406_NOT_ACCEPTABLE)
        else:
            return Response(status = status.HTTP_204_NO_CONTENT)



class LoginUser(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format=None):
        email = request.data.get('email')
        password = request.data.get('password')
        login_user = MyUser.objects.filters(emial__iexact=email)
        if login_user.password != password:
            return Response(status = status.HTTP_401_UNAUTHORIZED)
        
        #now give jwt tokens
        #
        #
        #
        #




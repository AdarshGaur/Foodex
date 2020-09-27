from django.urls import path
from blog import views
from django.conf.urls import include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
	path('recipe/', views.RecipeList.as_view()),              #for recipe lists
	path('recipe/<int:pk>/', views.RecipeDetail.as_view()),   #for recipes details
	path('users/', views.MyUserList.as_view()),               #for users list 'no_use'
	path('users/<int:pk>/', views.MyUserDetail.as_view()),    #for users details
	path('api-auth/', include('rest_framework.urls')),
	path('api/token/refresh/', TokenRefreshView.as_view()),   #for refresh token
	path('api/token/', TokenObtainPairView.as_view()),        #for access token / login
	path('auth/register/', views.CreateUser.as_view()),            #for sign up
	path('auth/register/otp/', views.VerifyOTP.as_view()),         #for verifying OTP
	path('auth/register/otp/resend/', views.ResendOtp.as_view()),  #for resending the otp
	path('auth/forgot-password/', views.ForgotPassword.as_view()),  #for forgot password
	path('auth/forgot-password/otp', views.ForgotPasswordOtp.as_view()),  #for checking otp after forgot password
	path('auth/forgot-password/new-password', views.NewPassword.as_view()),  #for forgot password
	
	#path('', views.Homepage.as_view()),
	#path('', views.random.as_view()),
	#path('', views.random.as_view()),
	#path('', views.random.as_view()),
	#path('', views.random.as_view()),
]




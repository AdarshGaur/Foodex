from django.urls import path
from blog import views
from django.conf.urls import include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
	path('recipe/', views.RecipeList.as_view()),
	path('recipe/<int:pk>/', views.RecipeDetail.as_view()),
	path('users/', views.MyUserList.as_view()),
	path('users/<int:pk>/', views.MyUserDetail.as_view()),
	path('api-auth/', include('rest_framework.urls')),
	path('api/token', TokenObtainPairView.as_view()),
	path('api/token/refresh/', TokenRefreshView.as_view()),
	path('register/', views.CreateUser.as_view()),
	
]




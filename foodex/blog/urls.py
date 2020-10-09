from django.urls import path
from blog import views
from django.conf.urls import include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
	#Homepage
	path('', views.RecipeCardsList.as_view()),                #for cards lists /Homepage

	#categories
	path('starters/', views.StartersCardsList.as_view()),                #for cards lists /Starters Category
	path('main-course/', views.MainCourseCardsList.as_view()),                #for cards lists /Main Course Category
	path('desserts/', views.DessertsCardsList.as_view()),                #for cards lists /Desserts Category
	path('drinks/', views.DrinksCardsList.as_view()),                #for cards lists /Drinks Category
	path('others/', views.OthersCardsList.as_view()),                #for cards lists /Others Category
	
	#searching recipes
	path('search/', views.SearchCardsList.as_view()),                #for searching cards
	path('search/sort/', views.SortCardsList.as_view()),                #for searching cards
	#added sorting routes also
	
	#
	path('recipe/like/', views.CardLike.as_view()),                		 #for liking recipes
	path('recipe/bookmark/', views.Bookmark.as_view()),                  #for bookmarking recipes
	# path('user/follow/', views.Follow.as_view()),                      #to follow users




	# path('user/following-list/', views.Follow.as_view()),              #for following list
	# path('user/follower-list/', views.Follow.as_view()),               #for follower list
	path('user/bookmark-list/', views.BookmarkList.as_view()),               #for bookmark list
	path('user/recipe-list/', views.MyRecipeList.as_view()),               #for My Recipe list


	#
	path('recipe/post/', views.CreateRecipe.as_view()),                       #for recipe create
	path('recipe/<int:pk>/', views.RecipeDetail.as_view()),                 #for recipes details
	# path('users/', views.MyUserList.as_view()),                          #for users list 'no_use'
	path('user/<int:pk>/', views.MyUserDetail.as_view()),                  #for users details
	# path('user/<int:pk>/posts/', views.MyUserDetail.as_view()),           #for users details
	path('my-account/', views.MyAccountDetail.as_view()),                  #for my-account details
	#path('user/<int:pk>/bookmark-list/', views.Bookmarklist.as_view()),    #for listing bookmarked recipes

	#
	# path('user/my-posts/', views.MyPosts.as_view()),               #for follower list


	#authentication
	path('api-auth/', include('rest_framework.urls')),
	path('api/token/refresh/', TokenRefreshView.as_view()),                   #for refresh token
	path('api/token/', TokenObtainPairView.as_view()),                        #for access token / login
	path('auth/register/', views.CreateUser.as_view()),                       #for sign up
	path('auth/register/otp/', views.VerifyOTP.as_view()),                    #for verifying OTP
	path('auth/register/otp/resend/', views.ResendOtp.as_view()),             #for resending the otp
	path('auth/forgot-password/', views.ForgotPassword.as_view()),            #for forgot password
	path('auth/forgot-password/otp/', views.ForgotPasswordOtp.as_view()),      #for checking otp after forgot password
	path('auth/forgot-password/new-password/', views.NewPassword.as_view()),   #for forgot password


	
	#path('', views.Homepage.as_view()),
	#path('', views.random.as_view()),
	#path('', views.random.as_view()),
	#path('', views.random.as_view()),
	#path('', views.random.as_view()),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


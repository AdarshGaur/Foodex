from django.urls import path

from blog.views import recipe_view


urlpatterns = [
    path('', recipe_view, name='recipe_details'),
]
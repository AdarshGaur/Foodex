from django.contrib import admin

# from django.contrib.auth import get_user_model
# from django.contrib.auth.admin import UserAdmin

from .models import Recipe, MyUser
# from blog.forms import CreateMyUser, UpdateMyUser

# Register your models here.

# class CustomUserAdmin(UserAdmin):
# 	add_form = CreateMyUser
# 	form = UpdateMyUser
# 	model = MyUser
# 	list_display = ['email', 'username', 'name']

admin.site.register(Recipe)
admin.site.register(MyUser)



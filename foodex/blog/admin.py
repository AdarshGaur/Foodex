from django.contrib import admin

# from django.contrib.auth import get_user_model
# from django.contrib.auth.admin import UserAdmin

from .models import Recipe, MyUser, OtpModel, LikeSystem

admin.site.register(Recipe)
admin.site.register(MyUser)
admin.site.register(OtpModel)
admin.site.register(LikeSystem)



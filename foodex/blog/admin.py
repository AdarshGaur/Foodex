from django.contrib import admin

# from django.contrib.auth import get_user_model
# from django.contrib.auth.admin import UserAdmin

from .models import (
	Recipe,
	MyUser,
	OtpModel,
	LikeSystem,
	BookmarkRecord
)

admin.site.register(Recipe)
admin.site.register(MyUser)
admin.site.register(OtpModel)
admin.site.register(LikeSystem)
admin.site.register(BookmarkRecord)




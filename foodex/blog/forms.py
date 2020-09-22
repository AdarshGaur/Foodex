from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import MyUser

# class CreateMyUser(UserCreationForm):
# 	class Meta:
# 		model = MyUser
# 		fields = ('username', 'email',)


# class UpdateMyUser(UserChangeForm):
# 	class Meta:
# 		model = MyUser
# 		fields = UserChangeForm.Meta.fields



from .models import Recipe, MyUser
from rest_framework import serializers


class RecipeSerializer(serializers.ModelSerializer):
	class Meta:
		model = Recipe
		fields = ['id', 'title', 'content','published_on', 'read_time',]

class MyUserSerializer(serializers.ModelSerializer):
	recipes = serializers.PrimaryKeyRelatedField(many=True, queryset = Recipe.objects.all(),)
	class Meta:
		model = MyUser
		fields = ['id', 'username', 'Recipe',]


class RegisterSerializer(serializers.ModelSerializer):
	confirm_password = serializers.CharField(style={'input_type': "password"}, write_only=True,)
	#maybe need validation here too!

	class Meta:
		model = MyUser
		fields = ['name', 'age', 'email', 'password', 'confirm_password', 'recipemagic', 'followers', 'following',]
		write_only_fields = ('password', 'confirm_password',)

	def create(self, validated_data):
		user = MyUser.objects.create(
					name = validated_data['name'],
					age = validated_data['age'],
					email = validated_data['email'],
			)
		password = validated_data['password']
		confirm_password = validated_data['password']
		
		if password != confirm_password:
			raise serializers.ValidationError({'password': 'Both Passwords must match.'})

		user.set_password(password)
		user.save()

		return user

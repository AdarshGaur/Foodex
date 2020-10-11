from .models import Recipe, MyUser, OtpModel, LikeSystem
from rest_framework import serializers
import math



class RegisterMyUser(serializers.ModelSerializer):

	confirm_password = serializers.CharField(style={'input_type': "password"}, write_only=True,)
	class Meta:
		model = MyUser
		fields = ['name', 'age', 'email', 'password', 'confirm_password']
		extra_kwargs = {"password": {"write_only": True}}



	def create(self, validated_data):
		#check if inactive user already exist in the db
		user_already_exists = True
		otp_already_exists = True
		try:
			existing_user = MyUser.objects.get(email=validated_data['email'])
		except MyUser.DoesNotExist:
			user_already_exists = False
			
		try:
			email_in_otp = OtpModel.objects.get(email=validated_data['email'])
		except OtpModel.DoesNotExist:
			otp_already_exists = False
		
		if user_already_exists and otp_already_exists:
			existing_user.delete()
			email_in_otp.delete()
		elif user_already_exists and otp_already_exists==False:
			raise serializers.ValidationError({'email': 'User already exists'})


		password = validated_data['password']
		confirm_password = validated_data['confirm_password']
		if password != confirm_password:
			raise serializers.ValidationError({'password_error': 'Both Passwords must match.'})


		user = MyUser.objects.create(
					username ='random',
					name = validated_data['name'],
					age = validated_data['age'],
					email = validated_data['email'],
					password = validated_data['password'],
				)
		user.set_password(password)
		user.is_active=False
		user.save()

		return user


class PostRecipeSerializer(serializers.ModelSerializer):
	
	#this serializer include both create and update recipe
	class Meta:
		model = Recipe
		fields = ['title', 'category', 'ingredients', 'img', 'content', 'published_on', 'modified_on', 'cook_time', 'veg']




class RecipeSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.name')
	ownerkapk = serializers.IntegerField(source='owner.pk')
	read_time = serializers.SerializerMethodField()

	#this serializer include both create and update recipe
	class Meta:
		model = Recipe
		fields = ['pk', 'title', 'category', 'ingredients', 'img', 'content', 'owner', 'ownerkapk', 'ownit', 'published_on', 'modified_on', 'cook_time', 'read_time', 'veg', 'points', 'like_is', 'bookmark_is']
	

	def get_read_time(self, Recipe):
		total_length = len(Recipe.content) + len(Recipe.ingredients)
		minutes = math.ceil(total_length/300)
		return minutes




class RecipeCardSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.name')
	ownerkapk = serializers.IntegerField(source='owner.pk')
	read_time = serializers.SerializerMethodField()

	class Meta:
		model = Recipe
		fields = ['pk', 'title', 'content', 'owner', 'ownerkapk', 'img', 'cook_time', 'read_time', 'points', 'veg']

	def get_read_time(self, Recipe):
		total_length = len(Recipe.content) + len(Recipe.ingredients)
		minutes = math.ceil(total_length/300)
		return minutes




#serializer for users details
class MyUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = MyUser
		fields = ['id', 'name', 'email', 'image_user', 'age', 'followers', 'following', 'bookmark_count', 'post_count']





# serializer for other users profile
class MyUserDetailSerializer(serializers.ModelSerializer):
	recipes = RecipeCardSerializer(many=True, read_only=True)

	class Meta:
		model = MyUser
		fields = ['id', 'name', 'email', 'image_user', 'age', 'followers', 'following', 'bookmark_count', 'post_count' , 'alreadyfollowed', 'recipes']




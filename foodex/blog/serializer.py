from .models import Recipe, MyUser, OtpModel
from rest_framework import serializers




class RecipeSerializer(serializers.ModelSerializer):

	#this serializer include both create and update recipe
	class Meta:
		model = Recipe
		fields = ['title', 'content', 'owner', 'published_on', 'modified_on', 'read_time', 'slug', 'yums',]




#serializer for user details
class MyUserSerializer(serializers.ModelSerializer):

	# recipes = serializers.PrimaryKeyRelatedField(many=True, queryset = Recipe.objects.all(),)
	class Meta:
		model = MyUser
		fields = ['name', 'email', 'age', 'recipemagic', 'followers', 'following', 'username',] #remove username from here




#Serializer for registriation of New Users
class RegisterMyUser(serializers.ModelSerializer):
	confirm_password = serializers.CharField(style={'input_type': "password"}, write_only=True,)
	#maybe need validation here too!

	class Meta:
		model = MyUser
		fields = ['name', 'age', 'email', 'password', 'confirm_password',]
		extra_kwargs = {'password': {'write_only': True}}

	def create(self, validated_data):

		#check if inactive user already exist in the db
		existing_user = MyUser.objects.get(email=validated_data['email'])
		email_in_otp = OtpModel.objects.get(email=validated_data['email'])
		if email_in_otp.DoesNotExist:
			pass
		else:
			existing_user.delete()
			email_in_otp.delete()
		
		user = MyUser.objects.create(
					name = validated_data['name'],
					age = validated_data['age'],
					email = validated_data['email'],
					username = 'anything',
					is_active = False,
					recipemagic = 0,
					followers = 0,
					following = 0,
			)
		password = validated_data['password']
		confirm_password = validated_data['password']

		if password != confirm_password:
			raise serializers.ValidationError({'password': 'Both Passwords must match.'})

		user.set_password(password)
		user.save()

		return user


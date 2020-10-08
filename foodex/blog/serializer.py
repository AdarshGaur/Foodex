from .models import Recipe, MyUser, OtpModel, LikeSystem
from rest_framework import serializers


#Serializer for registriation of New Users
class RegisterMyUser(serializers.ModelSerializer):

	confirm_password = serializers.CharField(style={'input_type': "password"}, write_only=True,)
	#maybe need validation here too!

	class Meta:
		model = MyUser
		fields = ['name', 'age', 'email', 'password', 'confirm_password']

		extra_kwargs = {"password": {"write_only": True}}



	def create(self, validated_data):
		#check if inactive user already exist in the db
		print('check1')
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
		
		print(otp_already_exists)
		print('user already exists: ')
		print(user_already_exists)
		if user_already_exists and otp_already_exists:
			existing_user.delete()
			email_in_otp.delete()
		elif user_already_exists and otp_already_exists==False:
			raise serializers.ValidationError({'email': 'User already exists'})


		password = validated_data['password']
		confirm_password = validated_data['confirm_password']
		print('check2')
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


# recipe creating/edit/get serializer
class PostRecipeSerializer(serializers.ModelSerializer):
	# owner = serializers.ReadOnlyField(source='owner.name')
	# email = serializers.ReadOnlyField(source='owner.email')
	# img_url = serializers.SerializerMethodField()
	# pk = serializers.ReadOnlyField(source=id)
	#this serializer include both create and update recipe
	class Meta:
		model = Recipe
		fields = ['title', 'category', 'ingredients', 'img', 'content', 'published_on', 'modified_on', 'cook_time', 'read_time', 'veg']


	# def get_img_url(self, Recipe):
	# 	request = self.context.get('request')
	# 	img_url = Recipe.img.url
	# 	return request.build_absolute_uri(img_url)


# recipe creating/edit/get serializer
class RecipeSerializer(serializers.ModelSerializer):
	#owner_pk = serializers.IntegerField(source=owner.pk)
	owner = serializers.ReadOnlyField(source='owner.name')
	# ownerkapk = serializers.IntegerField(source='owner.pk')
	# email = serializers.ReadOnlyField(source='owner.email')
	# img_url = serializers.SerializerMethodField()
	
	# pk = serializers.ReadOnlyField(source=id)
	#this serializer include both create and update recipe
	class Meta:
		model = Recipe
		fields = ['pk', 'title', 'category', 'ingredients', 'img', 'content', 'owner', 'ownerkapk', 'published_on', 'modified_on', 'cook_time', 'veg', 'points', 'like_is', 'bookmark_is']
	

	# def get_img_url(self, Recipe):
	# 	request = self.context.get('request')
	# 	img_url = Recipe.img.url
	# 	return request.build_absolute_uri(img_url)

	# def get_owner_pk(self, Recipe):
	# 	request = self.context.get('request')
	# 	owner_pk = self.owner.pk
	# 	return owner_pk

#cards serializer
class RecipeCardSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.name')
	# img_url = serializers.SerializerMethodField()
	# only for cards
	class Meta:
		model = Recipe
		fields = ['title', 'content', 'owner', 'img', 'cook_time', 'read_time', 'points', 'veg']


	# def get_img_url(self, Recipe):
	# 	request = self.context.get('request')
	# 	img_url = Recipe.img.url
	# 	return request.build_absolute_uri(img_url)


#serializer for user details
class MyUserSerializer(serializers.ModelSerializer):
	recipes = RecipeCardSerializer(many=True, read_only=True)
	# user_img_url = serializers.SerializerMethodField()
	# recipes = serializers.PrimaryKeyRelatedField(many=True, queryset = Recipe.objects.all(),)
	class Meta:
		model = MyUser
		fields = ['name', 'email', 'age', 'followers', 'following', 'bookmark_count', 'post_count', 'recipes']



	# def get_user_img_url(self, MyUser):
	# 	request = self.context.get('request')
	# 	img_url = MyUser.image_user.url
	# 	print(img_url)
	# 	print(request)
	# 	return request.build_absolute_uri(img_url)


#lkjghgfghkfghkfjhtbd ytjvd ytjxcyfoyulrfyv.fgjkd' ghyisfhild
# .mgjkfbd li;suda fghps9da;gdugjb[io'nha/gki fytdapg;hoipreaht;jkl
# g gjklunlsrdhyiobrea gyhfidgy hiljkdagytiljkafhisjkdafbiasudgbfguasdhfg;iouasdyfgjkdgfjk
# asdfhuisdhfklsdayfiljkadfbguioadfgb;uioadghiodafghladuytghkl.jagfjh
# kdagfaisdfnoiashfl;kahfoalkhioahfkldabngjkdfayt ihk;jagpdifhg[ofdnglfkdaghi
# kasldfhlksjafhkljsahfudfgyp9doglkdngpfidgh[0fdag]]]
# class ProfileSerializer(serializers.ModelSerializer):


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
		if user_already_exists and otp_already_exists:
			existing_user.delete()
			email_in_otp.delete()
		elif user_already_exists and otp_already_exists==False:
			raise serializers.ValidationError({'email': 'User with this email already exists'})

		
		password = validated_data['password']
		confirm_password = validated_data['confirm_password']
		print('check2')
		if password != confirm_password:
			raise serializers.ValidationError({'password_error': 'Both Passwords must match.'})


		user = MyUser.objects.create(
					name = validated_data['name'],
					age = validated_data['age'],
					email = validated_data['email'],
					username = 'anything',
					password = validated_data['password'],
				)
		user.set_password(password)
		user.save()

		return user



# recipe creating/edit/get serializer
class RecipeSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.name')
	# email = serializers.ReadOnlyField(source='owner.email')
	img_url = serializers.SerializerMethodField()
	# pk = serializers.ReadOnlyField(source=id)
	#this serializer include both create and update recipe
	class Meta:
		model = Recipe
		fields = ['pk', 'title', 'img_url', 'category', 'ingredients', 'content', 'owner', 'published_on', 'modified_on', 'cook_time', 'veg', 'points']
	

	def get_img_url(self, Recipe):
		request = self.context.get('request')
		img_url = Recipe.img.url
		return request.build_absolute_uri(img_url)


#cards serializer
class RecipeCardSerializer(serializers.ModelSerializer):
	owner = serializers.ReadOnlyField(source='owner.name')
	img_url = serializers.SerializerMethodField()
	# only for cards
	class Meta:
		model = Recipe
		fields = ['pk', 'title', 'img_url', 'content', 'owner', 'cook_time', 'points', 'veg']


	def get_img_url(self, Recipe):
		request = self.context.get('request')
		img_url = Recipe.img.url
		return request.build_absolute_uri(img_url)


#serializer for user details
class MyUserSerializer(serializers.ModelSerializer):
	recipes = RecipeCardSerializer(many=True, read_only=True)
	# recipes = serializers.PrimaryKeyRelatedField(many=True, queryset = Recipe.objects.all(),)
	class Meta:
		model = MyUser
		fields = ['name', 'email', 'age', 'followers', 'following', 'bookmark_count', 'recipes']










#lkjghgfghkfghkfjhtbd ytjvd ytjxcyfoyulrfyv.fgjkd' ghyisfhild
# .mgjkfbd li;suda fghps9da;gdugjb[io'nha/gki fytdapg;hoipreaht;jkl
# g gjklunlsrdhyiobrea gyhfidgy hiljkdagytiljkafhisjkdafbiasudgbfguasdhfg;iouasdyfgjkdgfjk
# asdfhuisdhfklsdayfiljkadfbguioadfgb;uioadghiodafghladuytghkl.jagfjh
# kdagfaisdfnoiashfl;kahfoalkhioahfkldabngjkdfayt ihk;jagpdifhg[ofdnglfkdaghi
# kasldfhlksjafhkljsahfudfgyp9doglkdngpfidgh[0fdag]]]



# class ProfileSerializer(serializers.ModelSerializer):
# 	
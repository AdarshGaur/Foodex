from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):

	def has_object_permission(self, request, view, obj):
		# print(obj)
		# print('2######2')
		# print(request.user)
		if request.method in permissions.SAFE_METHODS:
			# print('passed')
			# print(obj)
			# print(request.user)
			return True
		if obj.owner == request.user:
			#print('called')
			return True


# class IsLoggedIn(permissions.BasePermission):
# 	def has_object_permission(self, request, view, obj):
# 		if obj.owner == request.user:
# 			return True
# 		if request.user.id == 'None':
# 			return False
# 		# if request.user.is_acitve == False:
# 		# 	return False

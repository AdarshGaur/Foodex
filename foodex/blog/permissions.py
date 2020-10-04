from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
	def has_object_permission(self, request, view, obj):
		# print(obj)
		# print('2######2')
		# print(request.user)
		if request.method in permissions.SAFE_METHODS:
			return True
		if obj.owner == request.user:
			return True



from rest_framework import serializers
from src.models.users import User
from utils.users import get_user_by_args


class UserSerializer(serializers.ModelSerializer):
	first_name = serializers.CharField(required=True)
	last_name = serializers.CharField(required=True)
	username = serializers.CharField(required=True)
	email = serializers.EmailField(required=True)
	role = serializers.CharField(required=True)

	@staticmethod
	def validate_username(self, value):
		user = get_user_by_args(username=value)
		if user is None:
			return value

		raise serializers.ValidationError('Username già utilizzato')

	@staticmethod
	def validate_email(value):
		user = get_user_by_args(email=value)
		if user is None:
			return value

		raise serializers.ValidationError('Email già utilizzto')

	def create(self, data):
		user = User.objects.create_user(**data)
		return user

	@staticmethod
	def set_password(self, user_id, password):
		user = get_user_by_args(id=user_id)
		if user is None:
			return False

		user.set_password(password)
		user.save()

		return True

	class Meta:
		model = User
		fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name', 'is_staff', 'is_active']
		write_only_fields = ('password')

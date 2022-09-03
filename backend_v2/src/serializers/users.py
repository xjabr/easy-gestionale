from rest_framework import serializers

from src.models.users import User
from src.serializers.organizations import OrganizationSerializer
from utils.users import get_user_by_args
from utils.organizations import get_organization_by_id


class SignUpUserSerializer(serializers.ModelSerializer):
	first_name = serializers.CharField(required=True)
	last_name = serializers.CharField(required=True)
	username = serializers.CharField(required=True)
	email = serializers.EmailField(required=True)
	password = serializers.CharField(required=True, write_only=True)
	conf_password = serializers.CharField(required=True, write_only=True)

	def validate_username(self, value):
		user = get_user_by_args(username=value)

		if user is None:
			return value

		raise serializers.ValidationError('Username già utilizzato')

	def validate_email(self, value):
		user = get_user_by_args(email=value)

		if user is None:
			return value

		raise serializers.ValidationError('Email già utilizzato')

	def validate(self, attrs):
		if attrs['password'] != attrs['conf_password']:
			raise serializers.ValidationError('Password and Conf Password must be the same')

		return attrs

	def create(self, data):
		# del data['conf_password']  # remove conf_password from the dict

		user = User.objects.create(**data)

		user.set_password(data['password'])
		user.save()

		return user

	def set_password(self, user_id, password):
		user = get_user_by_args(id=user_id)
		if user is None:
			return False

		user.set_password(password)
		user.save()

		return True

	def set_organization(self, user_id, organization_id):
		user = get_user_by_args(id=user_id)

		if user is None:
			return False

		organization = get_organization_by_id(organization_id)

		if organization is None:
			return False

		user.organization = organization
		user.save()

		return True

	class Meta:
		model = User
		fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password', 'conf_password']
		write_only_fields = ('password', 'conf_password')


class UserSerializer(serializers.ModelSerializer):
	organization = OrganizationSerializer(read_only=True, many=False)
	first_name = serializers.CharField(required=True)
	last_name = serializers.CharField(required=True)
	username = serializers.CharField(required=True)
	email = serializers.EmailField(required=True)
	role = serializers.CharField(required=True)
	password = serializers.CharField(required=True, write_only=True)
	conf_password = serializers.CharField(required=True, write_only=True)

	def validate_username(self, value):
		user = get_user_by_args(username=value)
		if user is None:
			return value

		raise serializers.ValidationError('Username già utilizzato')

	def validate_email(self, value):
		user = get_user_by_args(email=value)
		if user is None:
			return value

		raise serializers.ValidationError('Email già utilizzato')

	def validate(self, attrs):
		if attrs['password'] != attrs['conf_password']:
			raise serializers.ValidationError('Password and Conf Password must be the same')

		return attrs

	def create(self, data):
		user = User.objects.create_user(**data)
		return user

	def set_password(self, user_id, password):
		user = get_user_by_args(id=user_id)
		if user is None:
			return False

		user.set_password(password)
		user.save()

		return True

	class Meta:
		model = User
		fields = ['id', 'organization', 'username', 'email', 'role', 'first_name', 'last_name', 'password', 'conf_password', 'is_staff', 'is_active']
		write_only_fields = ('password', 'conf_password')

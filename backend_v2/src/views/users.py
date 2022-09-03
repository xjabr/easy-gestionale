from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from src.models.users import User
from src.serializers.users import UserSerializer, SignUpUserSerializer
from src.serializers.organizations import OrganizationSerializer

from utils.users import generate_params_queryset, get_user_by_id
from utils.organizations import get_organization_by_id
from utils.responses import success_response

from exceptions.errors import assert_error


class OrganizationSignUp(APIView):
	def post(self, request):
		organization_serializer = OrganizationSerializer(data=request.data['organization'])
		organization_serializer.is_valid(raise_exception=True)
		organization_serializer.save()

		user_serializer = SignUpUserSerializer(data=request.data['user'])
		user_serializer.is_valid(raise_exception=True)
		user_serializer.create({
			**user_serializer.data,
			'organization': get_organization_by_id(organization_serializer.data['id']),
			'role': 'admin',
			'password': request.data['user']['password']
		})

		return success_response(None, {
			'organization': organization_serializer.data,
			'user': user_serializer.data
		}, 200)


class UserCreateListView(ListCreateAPIView):
	permission_classes = [IsAuthenticated]
	serializer_class = UserSerializer

	def get_queryset(self):
		order = self.request.query_params.get('order')
		if order is None or order == '':
			order = 'id'

		params = generate_params_queryset(self.request.query_params)
		data = User.objects.filter(**params, organization=self.request.user.organization.id).order_by(order)

		return data

	def list(self, request, *args, **kwargs):
		queryset = self.filter_queryset(self.get_queryset())
		serializers = self.get_serializer(queryset, many=True)

		return success_response(serializers.data, {}, 200)

	def create(self, request, *args, **kwargs):
		assert_error(request.user.role != 'admin', 'You don\'t have permission for create a new user', 401)

		serializer = UserSerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		user = serializer.create(dict(**serializer.data, organization=request.user.organization))
		serializer.set_password(user.id, request.data['password'])

		return success_response(serializer.data, {}, 200)


class SingleUserActionsView(APIView):
	permission_classes = [IsAuthenticated]

	# get single user
	def get(self, request, user_id: str = None):
		assert_error(user_id is None, 'ID not valid', 400)

		data = get_user_by_id(user_id)
		assert_error(data is None, 'Operator not found', 404)

		serializer = UserSerializer(data)

		return success_response(serializer.data, {}, 200)

	def patch(self, request, user_id: str = None):
		assert_error(user_id is None, 'ID not valid', 400)

		# serialize data and check if is correct
		serializer = UserSerializer(data=request.data)
		serializer.is_valid(raise_exception=False)

		# get user by id and update old data with the newest
		user = get_user_by_id(user_id)
		assert_error(user is None, 'Operator not found', 404)
		assert_error(request.user.role != 'admin' and user.role == 'admin',
								 'You must have the permissions to update this user', 401)

		user.first_name = serializer.data.get('first_name')
		user.last_name = serializer.data.get('last_name')
		user.username = serializer.data.get('username')
		user.email = serializer.data.get('email')
		user.role = serializer.data.get('role')

		# save
		user.save()

		return success_response('Operator updated with success', {}, 200)

	def delete(self, request, user_id: str = None):
		assert_error(user_id is None, 'ID not valid', 400)

		user = get_user_by_id(user_id)
		assert_error(user is None, 'Operator not found', 404)

		user.delete()

		return success_response('Operator removed with success', {}, 200)


class UpdatePasswordView(APIView):
	permission_classes = [IsAuthenticated]

	def post(self, request, user_id: str = None, *args, **kwargs):
		assert_error(user_id is None, 'ID not valid', 400)

		# get operators
		assert_error(id != str(request.user.id), 'You must have the permission for update the password of this user.', 401)

		user = request.user
		old_password = request.data.get('old_password')
		new_password = request.data.get('new_password')
		conf_new_password = request.data.get('conf_new_password')

		assert_error(
			new_password is None or new_password == '' or conf_new_password == '' or conf_new_password is None or old_password is None or old_password == '',
			'All fields must be filled', 400)
		assert_error(not user.check_password(old_password), 'Old password not valid.', 400)
		assert_error(new_password != conf_new_password, 'The Password and Confirm Password must be the same.', 400)

		# update new password
		user.set_password(new_password)
		user.save()

		return success_response('Password updated successfully.', {}, 200)

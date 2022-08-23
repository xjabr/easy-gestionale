from src.models.users import User


def get_user_by_id(id: str) -> User:
	try:
		return User.objects.get(id=id)
	except:
		return None


def get_user_by_args(**args) -> User:
	user = None

	try:
		user = User.objects.get(**args)
	except:
		user = None

	return user


def generate_params_queryset(data) -> dict:
	params = {}

	if data.get('role') != None and data.get('role') != '':
		params['role'] = data.get('role')

	return params

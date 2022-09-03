from src.models.organizations import Organization


def get_organization_by_id(organization_id: str) -> Organization:
	try:
		return Organization.objects.get(id=organization_id)
	except Exception as e:
		print(str(e))
		return None

from src.models.entities import Entity


def get_entity_by_id(entity_id: str) -> Entity:
	try:
		return Entity.objects.get(id=entity_id)
	except Exception as e:
		print(str(e))
		return None


def generate_params_queryset(data) -> dict:
	params = {}
	return params

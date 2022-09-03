from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from utils.entities import get_entity_by_id
from utils.responses import success_response

from exceptions.errors import assert_error

from src.models.entities import Entity
from src.serializers.entities import EntitySerializer


class ListCreateEntityView(ListCreateAPIView):
	permission_classes = [IsAuthenticated]
	serializer_class = EntitySerializer

	def get_queryset(self):
		data = Entity.objects.all()
		return data

	def list(self, request):
		queryset = self.filter_queryset(self.get_queryset())
		serializers = self.get_serializer(queryset, many=True)

		return success_response(serializers.data, {}, 200)

	def create(self, request, *args, **kwargs):
		serializer = EntitySerializer(data=request.data)
		serializer.is_valid(raise_exception=True)
		serializer.save(
			organization=request.user.organization,
			user=request.user
		)

		return success_response(serializer.data, {}, 200)


class SingleEntityView(APIView):
	permission_classes = [IsAuthenticated]

	def get(self, request, entity_id: str = None):
		assert_error(entity_id is None, 'ID not valid', 400)

		entity = get_entity_by_id(entity_id)
		assert_error(entity is None, 'Entity not found', 404)

		serializer = EntitySerializer(entity)

		return success_response(serializer.data, {}, 200)

	def patch(self, request, entity_id: str = None):
		assert_error(entity_id is None, 'ID not valid', 400)

		# serialize data and check if is correct
		serializer = EntitySerializer(data=request.data)
		serializer.is_valid(raise_exception=False)

		# get user by id and update old data with the newest
		entity = get_entity_by_id(entity_id)
		assert_error(entity is None, 'Entity not found', 404)

		entity.first_name = serializer.data.get('first_name')
		entity.last_name = serializer.data.get('last_name')
		entity.date_birth = serializer.data.get('date_birth')
		entity.notes = serializer.data.get('notes')

		# save
		entity.save()

		return success_response('Entity updated with success', {}, 200)

	def delete(self, request, entity_id: str = None):
		assert_error(entity_id is None, 'ID not valid', 400)

		entity = get_entity_by_id(entity_id)
		assert_error(entity is None, 'Entity not found', 404)

		entity.delete()

		return success_response('Entity removed with success', {}, 200)

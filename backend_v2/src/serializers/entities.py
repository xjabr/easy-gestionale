from rest_framework import serializers

from src.models.entities import Entity
from src.serializers.users import UserSerializer


class EntitySerializer(serializers.ModelSerializer):
	first_name = serializers.CharField(max_length=50, required=True)
	last_name = serializers.CharField(max_length=50, required=True)
	user = UserSerializer(read_only=True, many=False)
	date_birth = serializers.DateField(required=False, allow_null=True)
	notes = serializers.CharField(max_length=500, required=False, allow_null=True)

	class Meta:
		model = Entity
		fields = [ 'id', 'user', 'first_name', 'last_name', 'date_birth', 'notes' ]
		
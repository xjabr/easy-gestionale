from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from src.models.entities import Entity
from src.serializers.organizations import OrganizationSerializer
from src.serializers.users import UserSerializer


class EntitySerializer(serializers.ModelSerializer):
	type = serializers.CharField(required=True)
	first_name = serializers.CharField(required=True)
	last_name = serializers.CharField(required=True)
	organization = OrganizationSerializer(read_only=True, many=False)
	user = UserSerializer(read_only=True, many=False)
	vat_number = serializers.CharField(required=False, allow_null=True)
	tax_code = serializers.CharField(required=False, allow_null=True)
	date_birth = serializers.DateField(required=False, allow_null=True)
	notes = serializers.CharField(required=False, allow_null=True)

	def validate_type(self, value):
		if value != 'customer' and value != 'supplier':
			raise ValidationError('Type not valid')

		return value

	class Meta:
		model = Entity
		fields = [ 'id', 'user', 'organization', 'type', 'first_name', 'last_name', 'vat_number', 'tax_code', 'date_birth', 'notes' ]
		
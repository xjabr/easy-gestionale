from rest_framework import serializers

from src.models.organizations import Organization


class OrganizationSerializer(serializers.ModelSerializer):
	name = serializers.CharField(required=True)
	address = serializers.CharField(required=False, allow_null=True, allow_blank=True)
	country = serializers.CharField(required=False, allow_null=True, allow_blank=True)
	city = serializers.CharField(required=False, allow_null=True, allow_blank=True)
	postcode = serializers.CharField(required=False, allow_null=True, allow_blank=True)
	vat_number = serializers.CharField(required=False, allow_null=True, allow_blank=True)
	tax_code = serializers.CharField(required=False, allow_null=True, allow_blank=True)

	class Meta:
		model = Organization
		fields = ('id', 'name', 'address', 'country', 'city', 'postcode', 'vat_number', 'tax_code')
import uuid

from django.db import models


class Organization(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	name = models.CharField(max_length=50)
	address = models.CharField(max_length=50, null=True, default=None)
	country = models.CharField(max_length=25, null=True, default=None)
	city = models.CharField(max_length=25, null=True, default=None)
	postcode = models.CharField(max_length=6, null=True, default=None)
	vat_number = models.CharField(max_length=11, null=True, default=None)
	tax_code = models.CharField(max_length=16, null=True, default=None)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		verbose_name = "Organization"
		verbose_name_plural = "Organizations"

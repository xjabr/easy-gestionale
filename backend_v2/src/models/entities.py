from django.db import models

import uuid

from src.models.organizations import Organization
from src.models.users import User


class Entity(models.Model):
	TYPES = (
		('customer', 'Customer'),
		('supplier', 'Supplier')
	)

	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	type = models.CharField(max_length=50, choices=TYPES)
	organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
	user = models.ForeignKey(User, on_delete=models.SET_NULL, default=None, null=True)
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	vat_number = models.CharField(max_length=11, default=None, null=True)
	tax_code = models.CharField(max_length=16, default=None, null=True)
	date_birth = models.DateField(null=True, default=None)
	notes = models.TextField(max_length=500, null=True, default=None)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return str(self.id)

	class Meta:
		verbose_name = 'Entity'
		verbose_name_plural = 'Entities'

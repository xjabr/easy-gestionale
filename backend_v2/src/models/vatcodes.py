import uuid

from django.db import models

from src.models.organizations import Organization


class VatCode(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	organization = models.ForeignKey(Organization, on_delete=models.SET_NULL, default=None, null=True)
	name = models.CharField(max_length=50)
	description = models.CharField(max_length=500)
	value = models.FloatField(max_length=11, default=0.00)

from django.db import models
from django.contrib.auth.models import AbstractUser

from src.models.organizations import Organization

import uuid


class User(AbstractUser):
	ROLES = (
		('staff', 'Staff'),
		('admin', 'Admin'),
		('operator', 'Operator')
	)

	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
	role = models.CharField(max_length=15, null=True, default=ROLES[2][0], choices=ROLES)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

	def __str__(self):
		return str(self.id)

	class Meta:
		verbose_name = 'User'
		verbose_name_plural = 'Users'

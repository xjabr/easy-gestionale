from django.db import models

import uuid

from src.models.users import User

class Entity(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	user = models.ForeignKey(User, related_name='user_id', on_delete=models.SET_NULL, default=None, null=True)
	first_name = models.CharField(max_length=50)
	last_name = models.CharField(max_length=50)
	date_birth = models.DateField(null=True, default=None)
	notes = models.TextField(max_length=500, null=True, default=None)

	def __str__(self):
		return str(self.id)

	class Meta:
		verbose_name = 'Entity'
		verbose_name_plural = 'Entities'
from django.db import models
from django.contrib.auth.models import AbstractUser

import uuid

class User(AbstractUser):
  ROLES = (
    ('SUPER ADMIN', 'Super Admin'),
    ('ADMIN', 'Admin'),
    ('OPERATORE', 'Operatore'),
    ('SALES', 'Sales')
  )

  id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
  role = models.CharField(max_length=15, null=True, default=ROLES[2][0], choices=ROLES)

  def __str__(self):
    return str(self.id)

  class Meta:
    verbose_name = 'Utente'
    verbose_name_plural = 'Utenti'
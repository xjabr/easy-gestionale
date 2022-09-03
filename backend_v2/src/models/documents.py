import uuid

from django.db import models

from src.models.organizations import Organization
from src.models.users import User
from src.models.entities import Entity
from src.models.vatcodes import VatCode


class DocumentItem(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	name = models.CharField(max_length=50)
	code = models.CharField(max_length=50, default=None, null=True)
	description = models.CharField(max_length=50, default=None, null=True)
	vat = models.ForeignKey(VatCode, on_delete=models.SET_NULL, default=None, null=True)
	net_amount = models.FloatField(max_length=11, default=0.00)
	gross_amount = models.FloatField(max_length=11, default=0.00)
	discount = models.FloatField(max_length=11, default=0.00)


class DocumentPayment(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	method = models.CharField(max_length=50)
	date = models.DateField()
	due_date = models.DateField()
	amount = models.FloatField(max_length=11, default=0.00)


class DocumentPaymentMethod(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	name = models.CharField(max_length=100)
	iban = models.CharField(max_length=100, null=True, default=None)
	accountholder = models.CharField(max_length=100, null=True, default=None)
	subject = models.CharField(max_length=100, null=True, default=None)
	bank = models.CharField(max_length=100, null=True, default=None)


class Document(models.Model):
	TYPES = (
		('invoice', 'Invoice'),
		('receipt', 'Receipt'),
		('credit_note', 'Credit Note'),
		('quote', 'Quote')
	)

	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	type = models.CharField(max_length=50, choices=TYPES)
	number = models.IntegerField(default=0)
	date = models.DateField(default=None, null=True)
	organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
	user = models.ForeignKey(User, on_delete=models.SET_NULL, default=None, null=True)
	entity = models.ForeignKey(Entity, on_delete=models.SET_NULL, default=None, null=True)
	payment_method = models.ForeignKey(DocumentPayment, on_delete=models.SET_NULL, default=None, null=True)
	items = models.ManyToManyField(DocumentItem, related_name="items")
	payments = models.ManyToManyField(DocumentPayment, related_name="payments")
	net_amount = models.FloatField(max_length=11, default=0.00)
	gross_amount = models.FloatField(max_length=11, default=0.00)
	tax_amount = models.FloatField(max_length=11, default=0.00)
	taxes_total = models.FloatField(max_length=11, default=0.00)
	contributes_total = models.FloatField(max_length=11, default=0.00)
	created_at = models.DateTimeField(auto_now_add=True)
	updated_at = models.DateTimeField(auto_now=True)

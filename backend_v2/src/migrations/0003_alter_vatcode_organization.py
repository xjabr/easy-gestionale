# Generated by Django 4.0.4 on 2022-08-26 00:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0002_documentpayment_vatcode_documentitem_document'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vatcode',
            name='organization',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='vatcode_assigned_org', to='src.organization'),
        ),
    ]

# Generated by Django 4.0.4 on 2022-08-26 00:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('src', '0005_alter_user_organization'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entity',
            name='organization',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='src.organization'),
        ),
        migrations.AlterField(
            model_name='entity',
            name='user',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]

# Generated by Django 4.0.2 on 2022-02-22 13:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_box_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='box',
            name='room',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='boxes', to='api.room'),
        ),
    ]

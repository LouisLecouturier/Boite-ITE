# Generated by Django 4.0.2 on 2022-03-03 11:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0019_alter_box_room_alter_data_created_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='collect_frequency',
        ),
        migrations.AddField(
            model_name='box',
            name='collect_frequency',
            field=models.IntegerField(default=300),
        ),
    ]

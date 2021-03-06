# Generated by Django 4.0.2 on 2022-02-21 17:24

import datetime
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_room_collect_frequency'),
    ]

    operations = [
        migrations.CreateModel(
            name='DataType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=32)),
                ('display_name', models.CharField(max_length=32)),
                ('unit', models.CharField(max_length=16)),
            ],
        ),
        migrations.CreateModel(
            name='Data',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=32)),
                ('isError', models.BooleanField(default=False)),
                ('timeStamp', models.DateField(default=datetime.datetime.now)),
                ('data_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.datatype')),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.room')),
            ],
        ),
        migrations.CreateModel(
            name='Box',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=32)),
                ('battery', models.IntegerField(default=0)),
                ('sampling', models.BooleanField(default=True)),
                ('last_ping', models.DateField(default=datetime.datetime.now)),
                ('next_ping', models.DateField(default=datetime.datetime.now)),
                ('mac', models.CharField(max_length=32)),
                ('room', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.room')),
            ],
        ),
    ]

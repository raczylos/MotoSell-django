# Generated by Django 4.0.6 on 2022-08-07 20:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CarOffer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=80)),
                ('description', models.CharField(max_length=400)),
                ('car_category', models.CharField(choices=[('MOTORCYCLE', 'motorcycle'), ('CAR', 'car'), ('TRUCK', 'truck')], max_length=16)),
                ('brand', models.CharField(max_length=15)),
                ('model', models.CharField(max_length=30)),
                ('manufacture_year', models.IntegerField()),
                ('mileage', models.IntegerField()),
                ('cubic_capacity', models.IntegerField()),
                ('power', models.IntegerField()),
                ('fuel_category', models.CharField(choices=[('PETROL', 'petrol'), ('DIESEL', 'diesel'), ('LPG', 'lpg')], max_length=16)),
                ('image', models.ImageField(upload_to='files/images')),
                ('pub_date', models.DateField()),
                ('add_date', models.DateField(default=None)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

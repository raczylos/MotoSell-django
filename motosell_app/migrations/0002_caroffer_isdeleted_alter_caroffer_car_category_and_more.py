# Generated by Django 4.1 on 2023-04-27 15:19

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('motosell_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='caroffer',
            name='isDeleted',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='caroffer',
            name='car_category',
            field=models.CharField(choices=[('MOTORCYCLE', 'motocykl'), ('CAR', 'osobowy'), ('TRUCK', 'ciężarowy')], max_length=15),
        ),
        migrations.AlterField(
            model_name='caroffer',
            name='cubic_capacity',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='caroffer',
            name='description',
            field=models.CharField(max_length=400, validators=[django.core.validators.MinLengthValidator(10)]),
        ),
        migrations.AlterField(
            model_name='caroffer',
            name='fuel_category',
            field=models.CharField(choices=[('Benzyna', 'benzyna'), ('Diesel', 'diesel'), ('LPG', 'lpg')], max_length=15),
        ),
        migrations.AlterField(
            model_name='caroffer',
            name='isPublished',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='caroffer',
            name='manufacture_year',
            field=models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1800), django.core.validators.MaxValueValidator(2023)]),
        ),
        migrations.AlterField(
            model_name='caroffer',
            name='mileage',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='caroffer',
            name='power',
            field=models.PositiveIntegerField(),
        ),
        migrations.AlterField(
            model_name='caroffer',
            name='pub_date',
            field=models.DateField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='caroffer',
            name='title',
            field=models.CharField(max_length=80, validators=[django.core.validators.MinLengthValidator(4)]),
        ),
    ]

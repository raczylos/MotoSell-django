from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator, MinLengthValidator
from django.db import models
from datetime import date


class CarOffer(models.Model):
    title = models.CharField(validators=[MinLengthValidator(4)], max_length=80)
    description = models.CharField(validators=[MinLengthValidator(10)], max_length=400)

    MOTORCYCLE = "MOTORCYCLE"
    CAR = "CAR"
    TRUCK = "TRUCK"
    car_categories = [
        (MOTORCYCLE, "motocykl"),
        (CAR, "osobowy"),
        (TRUCK, "ciężarowy"),
    ]
    car_category = models.CharField(choices=car_categories, max_length=15)

    brand = models.CharField(max_length=15)
    model = models.CharField(max_length=30)
    manufacture_year = models.PositiveIntegerField(validators=[MinValueValidator(1800), MaxValueValidator(date.today().year)])
    mileage = models.PositiveIntegerField()
    cubic_capacity = models.PositiveIntegerField()
    power = models.PositiveIntegerField()

    PETROL = "Benzyna"
    DIESEL = "Diesel"
    LPG = "LPG"
    fuel_categories = [
        (PETROL, 'benzyna'),
        (DIESEL, 'diesel'),
        (LPG, 'lpg'),
    ]
    fuel_category = models.CharField(choices=fuel_categories, max_length=15)

    # user
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    # gallery
    image = models.ImageField(blank=True, null=True, upload_to='files/images')

    isPublished = models.BooleanField(default=False)
    isDeleted = models.BooleanField(default=False)

    pub_date = models.DateField(default=None, null=True, blank=True)
    add_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title

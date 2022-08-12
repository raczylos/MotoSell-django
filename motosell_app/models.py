from django.contrib.auth.models import User
from django.db import models


class CarOffer(models.Model):
    title = models.CharField(max_length=80)
    description = models.CharField(max_length=400)

    MOTORCYCLE = "MOTORCYCLE"
    CAR = "CAR"
    TRUCK = "TRUCK"
    car_categories = [
        (MOTORCYCLE, 'motocykl'),
        (CAR, 'osobowy'),
        (TRUCK, 'ciężarowy'),
    ]
    car_category = models.CharField(max_length=16, choices=car_categories)

    brand = models.CharField(max_length=15)
    model = models.CharField(max_length=30)
    manufacture_year = models.IntegerField()
    mileage = models.IntegerField()
    cubic_capacity = models.IntegerField()
    power = models.IntegerField()

    PETROL = "PETROL"
    DIESEL = "DIESEL"
    LPG = "LPG"
    fuel_categories = [
        (PETROL, 'benzyna'),
        (DIESEL, 'diesel'),
        (LPG, 'lpg'),
    ]
    fuel_category = models.CharField(max_length=16, choices=fuel_categories)

    #user
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    #gallery
    image = models.ImageField(upload_to='files/images')
    #TODO gallery

    pub_date = models.DateField(default=None, null=True)
    add_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.title



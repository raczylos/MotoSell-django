from django.contrib.auth.models import User
from django.db import models

class CarOffer(models.Model):
    title = models.CharField(max_length=80)
    description = models.CharField(max_length=400)

    MOTOCYKL = "MOTOCYKL"
    OSOBOWY = "OSOBOWY"
    CIEZAROWY = "CIEZAROWY"
    CAR_CATEGORIES = [
        (MOTOCYKL, 'motocykl'),
        (OSOBOWY, 'osobowy'),
        (CIEZAROWY, 'ciezarowy'),
    ]
    car_category = models.CharField(max_length=16, choices=CAR_CATEGORIES)

    brand = models.CharField(max_length=15)
    model = models.CharField(max_length=30)
    manufacture_year = models.IntegerField()
    mileage = models.IntegerField()
    cubic_capacity = models.IntegerField()
    power = models.IntegerField()

    BENZYNA = "BENZYNA"
    DIESEL = "DIESEL"
    LPG = "LPG"
    FUEL_CATEGORIES = [
        (BENZYNA, 'benzyna'),
        (DIESEL, 'diesel'),
        (LPG, 'lpg'),
    ]
    fuel_category = models.CharField(max_length=16, choices=FUEL_CATEGORIES)

    #user
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    #gallery
    image = models.ImageField(upload_to='files/images')
    #TODO gallery

    pub_date = models.DateField()
    add_date = models.DateField(default=None)

    def __str__(self):
        return self.title



from django.contrib.auth.models import User, Group
from rest_framework import serializers

from motosell_app.models import CarOffer


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class CarOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarOffer

        fields = ('id', 'title', 'description', 'author', 'car_category', 'brand', 'model', 'manufacture_year', 'mileage',
                  'cubic_capacity', 'power', 'fuel_category', 'price', 'image', 'isPublished', "isDeleted", "pub_date")
        read_only_fields = ('id',)

        def create(self, validated_data):
            car_offer = CarOffer.objects.create(
                title=validated_data['title'],
                description=validated_data['description'],
                author=validated_data['author'],
                car_category=validated_data['car_category'],
                brand=validated_data['brand'],
                model=validated_data['model'],
                manufacture_year=validated_data['manufacture_year'],
                mileage=validated_data['mileage'],
                cubic_capacity=validated_data['cubic_capacity'],
                power=validated_data['power'],
                fuel_category=validated_data['fuel_category'],
                price=validated_data['price'],
                image=validated_data['image'],
                isPublished=validated_data['isPublished'],
                isDeleted=validated_data['isDeleted'],
                pub_date=validated_data['pub_date']

            )

            car_offer.save()

            return car_offer

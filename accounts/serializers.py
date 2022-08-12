import jwt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User, Group
from rest_framework import serializers
from rest_framework.authentication import get_authorization_header

from MotoSell import settings


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        write_only_fields = ('password',)
        read_only_fields = ('id',)


    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

    # def create(self, validated_data):
    #     username = validated_data['username']
    #     password = validated_data['password']
    #
    #     user = authenticate(validated_data, username=username, password=password)
    #
    #     return user




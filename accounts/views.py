import jwt
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.authentication import SessionAuthentication, TokenAuthentication, BasicAuthentication, \
    get_authorization_header
from rest_framework_simplejwt.exceptions import AuthenticationFailed

from MotoSell import settings
from .forms import RegisterForm, LoginForm
from rest_framework.decorators import action
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import UserSerializer, LoginSerializer


class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)


class RegistrationViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)

    # def create(self, request):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data)


class LoginViewSet(viewsets.ModelViewSet):

    serializer_class = LoginSerializer
    queryset = User.objects.all()
    permission_classes = (AllowAny,)

    def create(self, request):
        queryset = User.objects.all()
        auth = get_authorization_header(request).split()

        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            decoded_token = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])
            user_id = decoded_token.get("user_id")
            return Response({'user_id': user_id})

        raise AuthenticationFailed('unauthorized')



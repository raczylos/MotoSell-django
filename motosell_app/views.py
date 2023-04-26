from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from rest_framework.permissions import AllowAny

from motosell_app.forms import CreateOfferForm
from motosell_app.models import CarOffer
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User


from motosell_app.serializers import UserSerializer, CarOfferSerializer


class CarOfferViewSet(viewsets.ModelViewSet):
    serializer_class = CarOfferSerializer
    queryset = CarOffer.objects.all()
    permission_classes = (AllowAny,)

    def list(self, request, *args, **kwargs):

        queryset = self.filter_queryset(self.get_queryset().filter(isDeleted=False).filter(isPublished=True))
        if not request.user.is_anonymous:
            if request.user.is_authenticated:
                queryset = self.filter_queryset(self.get_queryset().filter(isDeleted=False).filter(author=request.user))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.isPublished:
            serializer = self.get_serializer(instance)

        if not request.user.is_anonymous:
            if request.user.is_authenticated and instance.author == request.user:
                serializer = self.get_serializer(instance)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.isDeleted = True
        instance.save()
        print(instance)

        return Response("deleted")

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()

        if not request.user.is_anonymous:
            if request.user.is_authenticated and instance.author == request.user:
                serializer = self.get_serializer(instance, data=request.data, partial=partial)
                serializer.is_valid(raise_exception=True)
                serializer.save()


        return Response(serializer.data)



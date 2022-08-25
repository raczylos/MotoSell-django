from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from rest_framework.permissions import AllowAny

from motosell_app.forms import CreateOfferForm
from motosell_app.models import CarOffer
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User



# def home(request):
#
#
#     return render(request, 'motosell_app/home.html')

from motosell_app.serializers import UserSerializer, CarOfferSerializer


# @login_required
# def create_offer(request):
#     if request.method == 'POST':
#         create_offer_form = CreateOfferForm(request.POST, request.FILES)
#         if create_offer_form.is_valid():
#
#             offer = create_offer_form.save(commit=False)
#             offer.author = request.user
#             offer.save()
#
#             print("successfully created offer")
#             return redirect('/')
#         else:
#             error = create_offer_form.errors.as_data()
#             print(error)
#
#     create_offer_form = CreateOfferForm()
#     return render(request, 'motosell_app/create_offer.html', {'create_offer_form': create_offer_form})


# class CarOfferViewSet(viewsets.ModelViewSet):
#     serializer_class = CarOfferSerializer
#     queryset = CarOffer.objects.all()
#     permission_classes = (AllowAny,)
#
#     # def create(self, request, *args, **kwargs):
#     #     serializer = self.get_serializer(data=request.data)
#     #     serializer.is_valid(raise_exception=True)
#     #     serializer.save()
#     #     return Response(serializer.data)

class CarOfferViewSet(viewsets.ModelViewSet):
    serializer_class = CarOfferSerializer
    queryset = CarOffer.objects.all()
    permission_classes = (AllowAny,)
    print("jestem w carOffer")
    def list(self, request, *args, **kwargs):

        # body = request.body
        #
        #
        # print(body)

        # if request.isPublished == "false":
        #     print("siema")

        # if request.user.is_superuser:
        #     queryset = self.filter_queryset(self.get_queryset())
        # else:
        queryset = self.filter_queryset(self.get_queryset().filter(isPublished=True))

        if not request.user.is_anonymous:
            if request.user.is_authenticated:
                queryset = self.filter_queryset(self.get_queryset().filter(author=request.user))


        print(queryset)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     serializer.save()
    #     return Response(serializer.data)


@login_required
def user_offers(request):
    offer_list = CarOffer.objects.filter(author=request.user)

    return render(request, 'motosell_app/home.html', {'offer_list': offer_list})

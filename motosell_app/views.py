from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
# from .forms import RegisterForm, LoginForm
from django.contrib.auth import authenticate, login
from django.contrib import messages

from motosell_app.forms import CreateOfferForm
from motosell_app.models import CarOffer


# def home(request):
#
#
#     return render(request, 'motosell_app/home.html')

@login_required
def create_offer(request):
    if request.method == 'POST':
        create_offer_form = CreateOfferForm(request.POST, request.FILES)
        if create_offer_form.is_valid():

            offer = create_offer_form.save(commit=False)
            offer.author = request.user
            offer.save()

            print("successfully created offer")
            return redirect('/')
        else:
            error = create_offer_form.errors.as_data()
            print(error)

    create_offer_form = CreateOfferForm()
    return render(request, 'motosell_app/create_offer.html', {'create_offer_form': create_offer_form})


@login_required
def user_offers(request):
    offer_list = CarOffer.objects.filter(author=request.user)

    return render(request, 'motosell_app/home.html', {'offer_list': offer_list})

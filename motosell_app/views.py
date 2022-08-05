from django.shortcuts import render, redirect
# from .forms import RegisterForm, LoginForm
from django.contrib.auth import authenticate, login
from django.contrib import messages


def home(request):

    if request.user.is_authenticated:
        pass
    else:
        pass


    return render(request, 'motosell_app/home.html')

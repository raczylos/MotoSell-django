from django.shortcuts import render, redirect
from .forms import RegisterForm, LoginForm
from django.contrib.auth import authenticate, login
from django.contrib import messages


def register_user(request):
    if request.method == 'POST':
        register_form = RegisterForm(request.POST)
        if register_form.is_valid():
            user = register_form.save()

            login(request, user)

            first_name = register_form.cleaned_data['first_name']
            last_name = register_form.cleaned_data['last_name']
            email = register_form.cleaned_data['email']
            username = register_form.cleaned_data['username']
            password = register_form.cleaned_data['password']

            print(first_name, last_name, email, username, password)
            return redirect('/')

    register_form = RegisterForm()

    return render(request, 'registration/register_form.html', {'register_form': register_form})


def login_user(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        print(username)
        print(password)

        user = authenticate(request, username=username, password=password)
        print(user)
        if user is not None:
            login(request, user)
            print('logged in')
            return redirect('/')

        else:
            messages.success(request, "invalid username/password")
            print('invalid username/password')
            return redirect('/login_user')

    login_form = LoginForm()
    return render(request, 'registration/login.html', {'login_form': login_form})

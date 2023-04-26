from django import forms
from django.forms import PasswordInput

from motosell_app.models import CarOffer
from django.contrib.auth.models import User


class RegisterForm(forms.ModelForm):
    class Meta:
        model = User

        fields = ('first_name', 'last_name', 'email', 'username', 'password')
        widgets = {
            "first_name": forms.TextInput(attrs={'class': 'form-control'}),
            "last_name": forms.TextInput(attrs={'class': 'form-control'}),
            "email": forms.EmailInput(attrs={'class': 'form-control'}),
            "username": forms.TextInput(attrs={'class': 'form-control'}),
            "password": forms.PasswordInput(attrs={'class': 'form-control', 'autocomplete': 'off', 'data-toggle': 'password'}),
        }

    def save(self, commit=True):
        user = super(RegisterForm, self).save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class LoginForm(forms.ModelForm):
    class Meta:
        model = User

        fields = ('username', 'password')
        widgets = {
            "username": forms.TextInput(attrs={'class': 'form-control'}),
            "password": PasswordInput(attrs={'class': 'form-control', 'autocomplete': 'off', 'data-toggle': 'password'}),
        }
from django import forms
from motosell_app.models import CarOffer


class CreateOfferForm(forms.ModelForm):
    class Meta:
        model = CarOffer

        fields = ('title', 'description', 'car_category', 'brand', 'model', 'manufacture_year', 'mileage',
                  'cubic_capacity', 'power', 'fuel_category', 'image')

        widgets = {
            "title": forms.TextInput(attrs={'class': 'form-control'}),
            "description": forms.Textarea(attrs={'class': 'form-control'}),
            "car_category": forms.Select(attrs={'class': 'form-control'}),
            "brand": forms.TextInput(attrs={'class': 'form-control'}),
            "model": forms.TextInput(attrs={'class': 'form-control'}),
            "manufacture_year": forms.NumberInput(attrs={'class': 'form-control'}),
            "mileage": forms.NumberInput(attrs={'class': 'form-control'}),
            "cubic_capacity": forms.NumberInput(attrs={'class': 'form-control'}),
            "power": forms.NumberInput(attrs={'class': 'form-control'}),
            "fuel_category": forms.Select(attrs={'class': 'form-control'}),
            "image": forms.FileInput(attrs={'class': 'form-control'}),
        }

from django.urls import path, include
from . import views


urlpatterns = [
    # path('', views.home, name="home"),
    path('', views.user_offers, name="home"),
    path('offer/create', views.create_offer, name="create_offer")
    # path('', include('django.contrib.auth.urls')),

]
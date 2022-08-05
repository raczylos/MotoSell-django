from django.urls import path, include
from . import views

urlpatterns = [
    path('login_user/', views.login_user, name='login_user'),
    path('register/', views.register_user, name='register_user'),
    path('', include('django.contrib.auth.urls')),
    # path('', include('django.contrib.auth.urls')),

]
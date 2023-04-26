from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename="users")
router.register(r'registration', views.RegistrationViewSet, basename="registration")
router.register(r'login', views.LoginViewSet, basename="login")



urlpatterns = [
    path('', include(router.urls)),

    # path('login/', views.login_user, name='login'),
    # path('register/', views.register_user, name='register'),
    # path('logout/', views.logout_user, name='logout'),

    # path('', include('django.contrib.auth.urls')),


]
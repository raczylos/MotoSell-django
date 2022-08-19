from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register(r'offers', views.CarOfferViewSet, basename="users")


urlpatterns = [
    # path('', views.home, name="home"),
    path('', include(router.urls)),
    # path('', views.user_offers, name="home"),


    # path('offer/create', views.create_offer, name="create_offer")
    # path('', include('django.contrib.auth.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

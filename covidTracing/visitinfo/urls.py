from django.urls import path, include
from django.urls.resolvers import URLPattern
from .api import checkInAPI

urlpatterns = [
    path('checkin', checkInAPI.as_view())
]
from django.urls import path, include
from django.urls.resolvers import URLPattern
from .api import checkInAPI, loadCheckinData

urlpatterns = [
    path('checkin', checkInAPI.as_view()),
    path('loadcheckin', loadCheckinData.as_view())
]
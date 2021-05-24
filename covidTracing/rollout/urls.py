from django.urls import path, include
from .api import RolloutGroupAPI

urlpatterns = [
    path("", RolloutGroupAPI.as_view())
]
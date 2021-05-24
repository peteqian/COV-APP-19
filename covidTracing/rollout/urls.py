from django.urls import path, include
from .api import RolloutGroupAPI, getRolloutGroups

urlpatterns = [
    path("", RolloutGroupAPI.as_view()),
    path("get", getRolloutGroups.as_view())
]
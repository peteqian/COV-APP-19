from django.urls import path, include
from django.urls.resolvers import URLPattern
from .api import addVaccine, getAllVaccines, getUserInfo, giveDose

urlpatterns = [
    path('user',getUserInfo.as_view()),
    path('vaccine/dose',giveDose.as_view()),
    path('vaccine/add',addVaccine.as_view()),
    path('vaccines',getAllVaccines.as_view())
]
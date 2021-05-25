from django.urls import path, include
from django.urls.resolvers import URLPattern
from .api import addVaccine, editVaccine, getAllVaccines, getUserInfo, giveDose, GetVaccinePercentageAPI

urlpatterns = [
    path('user',getUserInfo.as_view()),
    path('vaccine/dose',giveDose.as_view()),
    path('vaccine/add',addVaccine.as_view()),
    path('vaccines',getAllVaccines.as_view()),
    path('vaccine/edit',editVaccine.as_view()),
    path('vaccine/current-stats', GetVaccinePercentageAPI.as_view()),
]
from django.contrib import admin
from vaccineinfo.models import Vaccines, RecievedVaccineDose
# Register your models here.

admin.site.register(Vaccines)
admin.site.register(RecievedVaccineDose)
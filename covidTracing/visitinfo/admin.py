from django.contrib import admin
from visitinfo.models import PostCode, Street, Address, Locations, Hotspot, Visits

# Register your models here.

admin.site.register(PostCode)
admin.site.register(Street)
admin.site.register(Address)
admin.site.register(Locations)
admin.site.register(Hotspot)
admin.site.register(Visits)
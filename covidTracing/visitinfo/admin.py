from django.contrib import admin
from visitinfo.models import PostCode, Street, Address, Locations

# Register your models here.

admin.site.register(PostCode)
admin.site.register(Street)
admin.site.register(Address)
admin.site.register(Locations)
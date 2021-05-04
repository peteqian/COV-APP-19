from django.db import models

# Create your models here.
class Location(models.Model):
    location = models.CharField(max_length=256, null=False)
    address = models.CharField(max_length=256)
    city = models.CharField(max_length=256)
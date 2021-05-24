from django.db import models
from datetime import datetime


class Vaccines(models.Model):
    name = models.CharField(max_length=100)
    doses_required = models.IntegerField(default=1)
    summary = models.CharField(max_length = 500)


class RecievedVaccineDose(models.Model):
    user = models.ForeignKey('accounts.Accounts', on_delete=models.CASCADE,related_name="user")
    vaccine = models.ForeignKey(Vaccines,on_delete=models.CASCADE)
    doses_recieved = models.IntegerField(default=0)
    last_dose_recieved_date = models.DateTimeField(default=datetime.now)



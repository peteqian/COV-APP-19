from django.db import models
from datetime import datetime


class Vaccines(models.Model):
    name = models.CharField(max_length=100)
    dosesRequired = models.IntegerField(default=1)


class RecievedVaccineDose(models.Model):
    userID = models.ForeignKey('accounts.Accounts', on_delete=models.CASCADE)
    vaccineID = models.ForeignKey(Vaccines,on_delete=models.CASCADE)
    dosesRecieved = models.IntegerField(default=0)
    lastDoseRecievedData = models.DateTimeField(default=datetime.now)



from django.db import models
from datetime import datetime
from django.core.validators import RegexValidator

# Create your models here.

    
#I think in general unless data should be mathematically manipulated it should be stored as a string 
#in relation to postcode
#potentially change postcode to PK?
class PostCode(models.Model):
    #needs to be changed to verify valid postcode, can be done in regex but thats too much black magic for me
    postcode = models.CharField(max_length=4, validators=[RegexValidator(regex='^(\d{4})$', message='Length has to be 4 integers', code='nomatch')], primary_key=True)
    state = models.CharField(max_length=3)

class Street(models.Model):
    name = models.CharField(max_length=255)
    PostCode = models.ForeignKey(PostCode, on_delete=models.PROTECT)

class Address(models.Model):
    street = models.ForeignKey(Street, on_delete=models.PROTECT)
    houseNumber = models.IntegerField()

class Locations(models.Model):
    address = models.ForeignKey(Address, on_delete=models.PROTECT)
    location_name = models.CharField(max_length=255)

class Visits(models.Model):
    user = models.ForeignKey('accounts.Accounts', on_delete=models.CASCADE)
    location = models.ForeignKey(Locations, on_delete=models.PROTECT)
    time_of_visit = models.DateTimeField(default=datetime.now)

class Dependents(models.Model):
    visit =  models.ForeignKey(Visits, on_delete=models.CASCADE,related_name='dependents')
    carer = models.ForeignKey('accounts.Accounts', on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=13, blank=True, default='')


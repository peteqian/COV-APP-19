from django.db import models

# Create your models here.
class RolloutGroup(models.Model):
    name = models.CharField(max_length=50)
    from_age = models.CharField(max_length=3)
    to_age = models.CharField(max_length=3)
    starting_date = models.CharField(max_length=50)
    vaccine_to_give = models.ForeignKey('vaccineinfo.Vaccines', on_delete=models.PROTECT)
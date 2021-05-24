
from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import Vaccines

class emailSerializer(serializers.Serializer):
    email = serializers.CharField()


class userSerializer(serializers.Serializer):
    first_name = serializers.CharField()
    last_name = serializers.CharField()



class getVaccineInfoSerializer(serializers.Serializer):
    user = UserSerializer()
    vaccine = serializers.CharField()
    doses_recieved = serializers.CharField()
    last_dose_recieved_date = serializers.DateTimeField()


class giveDoseSerializer(serializers.Serializer):
    user_email = serializers.CharField()
    vaccine_id = serializers.IntegerField()

    def validate(self,data):
        #will raise DoesNotExist exception if not found
        Vaccines.objects.get(id=data["vaccine_id"])
        return data

class addVaccineSerializer(serializers.Serializer):
    name = serializers.CharField()
    summary = serializers.CharField()
    doses_required = serializers.IntegerField()

class allVaccinesSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    summary = serializers.CharField()
    doses_required = serializers.IntegerField()

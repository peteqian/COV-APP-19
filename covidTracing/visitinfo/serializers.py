
from visitinfo.models import Visits, Dependents
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from knox.auth import TokenAuthentication as TA




#nested serializers are read only
class dependentSerializer(serializers.Serializer):
   

    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phone_number = serializers.CharField()


class CheckInSerializer(serializers.Serializer):
    location_id = serializers.CharField()
    dependents = dependentSerializer(many=True, required=False)

class loadCheckInSerializer(serializers.Serializer):
    email= serializers.CharField()
    location_id = serializers.CharField()
    dependents = dependentSerializer(many=True, required=False)


#need to reimplement, ensure all data sent is valid
#not used to validate user

    # def validate(self, data):
    #     user = TA.authenticate_credentials(key='token string').user
    #     # user = authenticate(**data)
    #     if user and user.is_active:
    #         return user
    #     raise serializers.ValidationError("Incorrect Credentials")

# class getDependentSerializer(serializers.Serializer):
#     class Meta:
#         model = Dependents
#         fields = [
#             'carer',
#             'first_name',
#             'last_name',
#             'phone_number'
#         ]




class LocationSerializer(serializers.Serializer):
    city = serializers.CharField()

class VisitsSerializer(serializers.Serializer):
    dependents = dependentSerializer(many=True)
    location = LocationSerializer(many=False)
    time_of_visit = serializers.DateTimeField()


class HotSpotSerializer(serializers.Serializer):
    location = LocationSerializer(many=False)
    amount_of_cases = serializers.IntegerField()
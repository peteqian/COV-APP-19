
from visitinfo.models import Visits, Dependents
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from knox.auth import TokenAuthentication as TA




#nested serializers are read only
class dependentSerializer(serializers.Serializer):
   

    firstname = serializers.CharField()
    lastname = serializers.CharField()
    phonenumber = serializers.CharField()


class CheckInSerializer(serializers.Serializer):
    phoneNumber = serializers.CharField()
    locationID = serializers.CharField()
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
#             'firstname',
#             'lastname',
#             'phonenumber'
#         ]




class LocationSerializer(serializers.Serializer):
    locationName = serializers.CharField()

class VisitsSerializer(serializers.Serializer):
    dependents = dependentSerializer(many=True)
    location = LocationSerializer(many=False)
    timeOfVisit = serializers.DateTimeField()



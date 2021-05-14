
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate


#nested serializers are read only
class dependentSerializer(serializers.Serializer):
    firstName = serializers.CharField()
    lastName = serializers.CharField()
    phoneNumber = serializers.CharField()

class CheckInSerializer(serializers.Serializer):
    firstName = serializers.CharField()
    lastName = serializers.CharField()
    phoneNumber = serializers.CharField()
    locationID = serializers.CharField()
    dependents = dependentSerializer(many=True, required=False)

    # def validate(self, data):
    #     user = authenticate(**data)
    #     if user and user.is_active:
    #         return user
    #     raise serializers.ValidationError("Incorrect Credentials")

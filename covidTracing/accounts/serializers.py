from django.core.exceptions import ValidationError
from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
import django.contrib.auth.password_validation as validators 

#serializer for general user
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('email', 'first_name', 'last_name', 'phone_number', 'user_type', 'cov_status')

#serializer for health user
class HealthSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'user_type')

#serializer for business user - Something with this will need to be changed to return the business locationID 
class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('email', 'user_type', 'first_name', 'last_name')

#serializer for Organisation user
class OrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('first_name', 'last_name', 'user_type')


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validators.validate_password])

    class Meta:
        model = get_user_model()
        fields = ('email', 'first_name', 'last_name', 'phone_number', 'password')
        extra_kwargs = {'password': {'write_only': True}}

        def create(self, validated_data):
            user = get_user_model().objects.create_user(validated_data['email'], validated_data['first_name'], validated_data['last_name'], validated_data['phone_number'], validated_data['password'])

            return user

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
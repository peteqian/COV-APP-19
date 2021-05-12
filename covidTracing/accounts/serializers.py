from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('email', 'first_name', 'last_name', 'cov_result')



class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('email', 'first_name', 'last_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

        def create(self, validated_data):
            user = get_user_model().objects.create_user(validated_data['email'], validated_data['first_name'], validated_data['last_name'], validated_data['password'])

            return user

class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")
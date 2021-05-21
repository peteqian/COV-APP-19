from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer, HealthSerializer, OrganisationSerializer, BusinessSerializer

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data, 
            "token": AuthToken.objects.create(user)[1]
        })

class RegisterBusinessAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.user_type = 'BUSINESS_USER'
        user.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data, 
            "token": AuthToken.objects.create(user)[1]
        })


class UpdateAPI(generics.GenericAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def put(self, request, *args, **kwargs):
        user = self.request.user
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(True)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        #check for user type here and return specified data
        if user.user_type == "GENERAL_USER":
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data, 
                "token": AuthToken.objects.create(user)[1]
            })
        elif user.user_type == "HEALTH_USER":
            return Response({
                "user": HealthSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1]
            })
        elif user.user_type == "ORGANISATION_USER":
            return Response({
                "user": OrganisationSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1]
            })
        elif user.user_type == "BUSINESS_USER":
            return Response({
                "user": BusinessSerializer(user, context=self.get_serializer_context()).data,
                "token": AuthToken.objects.create(user)[1]
            })
        else:
            print("Something is wrong lol")


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
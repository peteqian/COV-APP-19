
from rest_framework import generics, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import CheckInSerializer

# Create your views here.



class checkInAPI(generics.RetrieveAPIView):
    #verify token
    permissions_classes = [permissions.IsAuthenticated, ] 
    serializer_class = CheckInSerializer

    def post(self, request, *args, **kwargs):

        # return Response({
        #     "message" : "help"
        # })
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({
            "data" : serializer.data
        })
     


    #associate token with user


    #update tables


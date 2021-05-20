
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import CheckInSerializer
from knox.auth import TokenAuthentication
from visitinfo.models import Visits, Locations, Dependents
from accounts.models import Accounts

# Create your views here.



class checkInAPI(APIView):
    #verify token
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = CheckInSerializer

    def post(self, request, *args, **kwargs):
        # return Response({
        #     "message" : "help"
        # })
        serializer = CheckInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        

        uid = Accounts.objects.get(id=self.request.user.id) 
        lid = Locations.objects.get(id=serializer.data["locationID"])

        v = Visits.objects.create(user=uid, location=lid)

        dlist = serializer.data["dependents"]

        for d in dlist:
            Dependents.objects.create(visit=v, carer=uid, firstname=d["firstName"],lastname=d["lastName"],phonenumber=d["phoneNumber"])
        
        return Response({
            "data" : serializer.data
        })
    
    def get(self, request, format=None):
        content = {
            'foo':'bar'
        }
        return Response(content)


    #associate token with user


    #update tables


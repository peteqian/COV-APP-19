
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from .serializers import CheckInSerializer, HotSpotSerializer, VisitsSerializer
from knox.auth import TokenAuthentication
from visitinfo.models import Visits, Locations, Dependents, Hotspot
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
        lid = Locations.objects.get(id=serializer.data["location_id"])

        v = Visits.objects.create(user=uid, location=lid)

        dlist=serializer.data["dependents"]

        for d in dlist:
            Dependents.objects.create(visit=v, carer=uid, first_name=d["first_name"],last_name=d["last_name"],phone_number=d["phone_number"])
        
        return Response(True)
    
    def get(self, request, format=None):
        uid = Accounts.objects.get(id=self.request.user.id) 
        visit = Visits.objects.filter(user_id=uid)
        # print(visit)
        serializer = VisitsSerializer(visit,many=True)

        return Response({
            "data" : serializer.data
        })


    #     return Response(content)

class hotspotlistAPI(APIView):
    def post(self, request, format=None):
        for hs in Hotspot.objects.all():
            count = 0
            checkins = Visits.objects.filter(location=hs.location)
            for ci in checkins:
                if ci.user.cov_status == "POSITIVE":
                    count += 1
            
            if count != hs.amount_of_cases:
                hs.amount_of_cases = count
                hs.save()
        return Response(True)
    
    def get(self, request, format=None):
        hotspots = Hotspot.objects.all().order_by('-amount_of_cases', 'location__location_name')
        serializer = HotSpotSerializer(hotspots, many=True)

        return Response({
            'data': serializer.data
        })
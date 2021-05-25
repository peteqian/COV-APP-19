from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import addVaccineSerializer, VaccinesSerializer, deleteSerializer, getVaccineInfoSerializer, emailSerializer, giveDoseSerializer
from accounts.serializers import UserSerializer
from knox.auth import TokenAuthentication
from accounts.models import Accounts
from .models import Vaccines, RecievedVaccineDose

class getUserInfo(APIView):
    #verify User
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = emailSerializer

    def get(self,request, *args, **kwargs):
        serializer = emailSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)

        user = Accounts.objects.get(id=self.request.user.id)
        if(user.user_type == "HEALTH_USER"):
            pass
        else:
            return Response({
                'data':'Error user is not health staff'
            })

        user = Accounts.objects.get(email=serializer.data['email'])
        try:
            vaxData = RecievedVaccineDose.objects.get(user=user)
        except:
            return Response({
            "user": {
                "firstname": user.first_name,
                "last_name": user.last_name
            },
            "vaccinations" : "None"
        })

        return Response({
            "user": {
                "firstname": user.first_name,
                "last_name": user.last_name
            },
            "vaccinations" : {
                "vaccine" : vaxData.vaccine.name,
                "received doses" : vaxData.doses_recieved,
                "last dose date" : vaxData.last_dose_recieved_date
            }
        })


class giveDose(APIView):
    #verify token
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = giveDoseSerializer

    def post(self, request, *args, **kwargs):
        serializer = giveDoseSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = Accounts.objects.get(id=self.request.user.id)
        if(user.user_type == "HEALTH_USER"):
            pass
        else:
            return Response({
                'data':'Error user is not health staff'
            })

        user = Accounts.objects.get(email=serializer.data['user_email'])
        vax = Vaccines.objects.get(id=serializer.data['vaccine_id'])

        try:
            v = RecievedVaccineDose.objects.get(user_id=user)
            #vid = getattr(v,'vaccine_id')
            #if user already has that type of vaccine increment doses
            
            if v.vaccine_id == serializer.data['vaccine_id']:
                x = v.doses_recieved
                x = x + 1
                v.doses_recieved = x
                v.save()
                return Response(True)
            else:
                return Response({
                    'data': 'user is engaged with another vaccine',
                    'vid' : v.vaccine_id,
                    'attempted' : serializer.data['vaccine_id']
                })
            
        except:
            RecievedVaccineDose.objects.create(user_id=user.id,vaccine=vax,doses_recieved ='1')
            return Response(True)

class addVaccine(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = giveDoseSerializer

    def post(self, request, *args, **kwardgs):
        serializer = addVaccineSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = Accounts.objects.get(id=self.request.user.id)
        if(user.user_type == "HEALTH_USER"):
            pass
        else:
            return Response({
                'data':'Error user is not health staff'
            })

        try:
            Vaccines.objects.get(name=serializer.data['name'])
            return Response({
                'data': 'Vaccine Name Already Exists'
            })
        except:
            pass

        v = Vaccines.objects.create(name = serializer.data['name'],doses_required=serializer.data["doses_required"],summary=serializer.data["summary"])
        return Response({
            'id': v.id
        })

class getAllVaccines(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = giveDoseSerializer
    
    def get(self, request, format=None):
        vaccines = Vaccines.objects.all()
        serializer = VaccinesSerializer(vaccines,many=True)
        return Response({
            'data': serializer.data
        })

class editVaccine(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    serializer_class = giveDoseSerializer

    def put(self, request, *args, **kwardgs):
        serializer = VaccinesSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        vax = Vaccines.objects.get(id=serializer.data['id'])

        vax.name = serializer.data['name']
        vax.summary = serializer.data['summary']
        vax.doses_required = serializer.data['doses_required']
        vax.save()
        return Response(True)

    def delete(self, request, *args, **kwardgs):
        serializer = deleteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        vax = Vaccines.objects.get(id=serializer.data['id'])
        vax.active = False
        vax.save()
        return Response(True)

    
class GetVaccinePercentageAPI(APIView):
    def get(self,request, *args, **kwargs):
        count = Accounts.objects.filter(user_type='GENERAL_USER')
        vaccinatedCount = 0

        for vd in RecievedVaccineDose.objects.all():
            if vd.doses_recieved >= vd.vaccine.doses_required:
                vaccinatedCount += 1

        percentage = round( ((vaccinatedCount/count.count())*100), 2) 
        
        return Response({
            "data": {
                "users" : count.count(),
                "vaccinated": vaccinatedCount,
                "percentage_vaccinated": percentage
            }
        })

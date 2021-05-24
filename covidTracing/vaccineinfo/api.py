from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import addVaccineSerializer, getVaccineInfoSerializer, emailSerializer, giveDoseSerializer
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

        user = Accounts.objects.get(email=serializer.data['email'])
        send = getVaccineInfoSerializer(user)

        return({
            'data' : send.data
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


    


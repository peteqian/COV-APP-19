from vaccineinfo.serializers import VaccinesSerializer
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import RoulloutGroupSerializer, groupsSerializer
from knox.auth import TokenAuthentication
from .models import RolloutGroup
from vaccineinfo.models import Vaccines

class RolloutGroupAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        serializer = RoulloutGroupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if(self.request.user.user_type != 'ORGANISATION_USER'):
            return Response({
                "data":"User is not and organisation user"
            })
        v = Vaccines.objects.get(id=serializer.data["vaccine_id_to_give"])
        RolloutGroup.objects.create(name=serializer.data["name"], 
                                    from_age=serializer.data["from_age"], 
                                    to_age=serializer.data["to_age"],
                                    starting_date=serializer.data["starting_date"],
                                    vaccine_to_give=v)
        return Response(True)


    def put(self, request, *args, **kwargs):
        serializer = RoulloutGroupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ROGroup = RolloutGroup.objects.get(id=request.data['id'])

        ROGroup.name = serializer.data["name"]
        ROGroup.from_age = serializer.data["from_age"]
        ROGroup.to_age = serializer.data["to_age"]
        ROGroup.starting_date = serializer.data["starting_date"]

        v = Vaccines.objects.get(id=serializer.data["vaccine_id_to_give"])      
        ROGroup.vaccine_to_give = v
        ROGroup.save()

        return Response(True)

    def delete(self, request, *args, **kwargs):
        RolloutGroup.objects.filter(id=request.data["id"]).delete()
        return Response(True)


class getRolloutGroups(APIView):
    def get(self, request, format=None):
        groups = RolloutGroup.objects.all()
        serializer = groupsSerializer(groups, many=True)
        
        return Response({
            "data": serializer.data
        })
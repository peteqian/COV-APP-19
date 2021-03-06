from vaccineinfo.serializers import VaccinesSerializer
from rest_framework import serializers

class RoulloutGroupSerializer(serializers.Serializer):
    name = serializers.CharField()
    from_age = serializers.CharField()
    to_age = serializers.CharField()
    starting_date = serializers.CharField()
    vaccine_id_to_give = serializers.CharField()

class groupsSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    from_age = serializers.CharField()
    to_age = serializers.CharField()
    starting_date = serializers.CharField()
    vaccine_to_give = VaccinesSerializer(many=False)
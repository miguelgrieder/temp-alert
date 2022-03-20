from rest_framework import serializers
from base.models import Status, ReportSensor, Alerta



class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = '__all__'

class ReportSensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportSensor
        fields = '__all__'

class AlertaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alerta
        fields = '__all__'
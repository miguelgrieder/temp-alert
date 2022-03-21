from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import  Status, ReportSensor, Alerta
from .serializers import StatusSerializer, ReportSensorSerializer, AlertaSerializer
import requests


@api_view(['GET'])
def getStatus(request):
    status = Status.objects.all()
    serializer_status = StatusSerializer(status, many=True)
    return Response(serializer_status.data)

@api_view(['POST'])
def addStatus(request):
    serializer_status = StatusSerializer(data=request.data)
    if serializer_status.is_valid():
        serializer_status.save()
    return Response(serializer_status.data)

@api_view(['GET'])
def getReportSensor(request):
    report_sensor = ReportSensor.objects.all()
    serializer_reports_sensor = ReportSensorSerializer(report_sensor, many=True)
    return Response(serializer_reports_sensor.data)

@api_view(['POST'])
def addReportSensor(request):
    serializer_reports_sensor = ReportSensorSerializer(data=request.data)
    if serializer_reports_sensor.is_valid():
        data_request = request.data
        serializer_reports_sensor.save()
        temperatura = int(data_request['temperatura'])
        humidade = int(data_request['humidade'])
        if (17 > temperatura or temperatura > 27) or (30 > humidade or humidade > 90):
            payload = \
                {

                    "temperatura": f"{temperatura}",
                    "humidade": f"{humidade}",
                    "date_report_sensor": "2022",

                }
            request_addAlerta = requests.post('http://127.0.0.1:8000/addAlerta', payload)
        else:
            payload = \
                {
                    "status_bool": False,
                }
            request_addStatus = requests.post('http://127.0.0.1:8000/addStatus', payload)
    return Response(serializer_reports_sensor.data)

@api_view(['GET'])
def getAlerta(request):
    alerta = Alerta.objects.all()
    serializer_alertas = AlertaSerializer(alerta, many=True)
    return Response(serializer_alertas.data)

@api_view(['POST'])
def addAlerta(request):
    print(f'Report ALERTA')
    serializer_alertas = AlertaSerializer(data=request.data)
    if serializer_alertas.is_valid():
        serializer_alertas.save()
        payload = \
            {
                "status_bool": True,
            }
        request_addStatus = requests.post('http://127.0.0.1:8000/addStatus', payload)
    return Response(serializer_alertas.data)



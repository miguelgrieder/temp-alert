from django.db import models

# Create your models here.
class Status(models.Model):
    status_bool = models.BooleanField()
    data_request = models.DateTimeField(auto_now_add=True)

class ReportSensor(models.Model):
    temperatura = models.CharField(max_length=5)
    humidade = models.CharField(max_length=5)
    data_request = models.DateTimeField(auto_now_add=True)

class Alerta(models.Model):
    temperatura = models.CharField(max_length=5)
    humidade = models.CharField(max_length=5)
    date_report_sensor = models.CharField(max_length=60)
    data_request = models.DateTimeField(auto_now_add=True)
from django.urls import path
from . import views

urlpatterns = [
    path('getStatus', views.getStatus),
    path('addStatus', views.addStatus),
    path('getReportSensor', views.getReportSensor),
    path('addReportSensor', views.addReportSensor),
    path('getAlerta', views.getAlerta),
    path('addAlerta', views.addAlerta),
]
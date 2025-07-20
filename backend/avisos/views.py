from django.shortcuts import render
from rest_framework import viewsets
from .models import Aviso
from .serializers import AvisoSerializer
from django.utils import timezone
from django.db import models

# Create your views here.

class AvisoViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AvisoSerializer

    def get_queryset(self):
        hoy = timezone.now().date()
        return Aviso.objects.filter(
            visible=True
        ).filter(
            models.Q(fecha_inicio__isnull=True) | models.Q(fecha_inicio__lte=hoy),
            models.Q(fecha_fin__isnull=True) | models.Q(fecha_fin__gte=hoy)
        ).order_by('orden', '-fecha_modificacion')

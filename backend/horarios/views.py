from django.shortcuts import render
from rest_framework import generics
from .models import Horario
from .serializers import HorarioSerializer

class HorarioListView(generics.ListAPIView):
    """
    Vista para obtener la lista de horarios activos.
    """
    queryset = Horario.objects.filter(activo=True).order_by('dia_semana')
    serializer_class = HorarioSerializer


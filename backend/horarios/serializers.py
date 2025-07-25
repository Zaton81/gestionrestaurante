from rest_framework import serializers
from .models import Horario

class HorarioSerializer(serializers.ModelSerializer):
    dia_semana_display = serializers.CharField(source='get_dia_semana_display', read_only=True)

    class Meta:
        model = Horario
        fields = ['id', 'dia_semana', 'dia_semana_display', 'hora_apertura', 'hora_cierre', 'cerrado']



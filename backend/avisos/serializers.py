from rest_framework import serializers
from .models import Aviso

class AvisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aviso
        fields = ['id', 'titulo', 'contenido', 'visible', 'orden', 'fecha_inicio', 'fecha_fin', 'fecha_modificacion'] 
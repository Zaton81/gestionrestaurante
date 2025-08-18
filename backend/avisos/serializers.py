from rest_framework import serializers
from .models import Aviso

class AvisoSerializer(serializers.ModelSerializer):
    """
    Serializador para el modelo Aviso.

    Convierte los objetos del modelo Aviso a formatos como JSON,
    y viceversa, para ser utilizados en la API.
    """
    class Meta:
        model = Aviso
        fields = ['id', 'titulo', 'contenido', 'visible', 'orden', 'fecha_inicio', 'fecha_fin', 'fecha_modificacion'] 
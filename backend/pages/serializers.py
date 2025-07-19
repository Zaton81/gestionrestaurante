from rest_framework import serializers
from .models import Pagina

class PaginaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagina
        fields = ['id', 'slug', 'titulo', 'contenido', 'visible', 'fecha_modificacion'] 
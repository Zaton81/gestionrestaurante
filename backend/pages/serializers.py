from rest_framework import serializers
from .models import Pagina

class PaginaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagina
        # Omitimos 'id' y 'visible' para una API más limpia, ya que la vista
        # solo devuelve páginas visibles y las identificamos por el 'slug'.
        fields = ['slug', 'titulo', 'contenido', 'fecha_modificacion']
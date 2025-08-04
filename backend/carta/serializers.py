
from rest_framework import serializers
from .models import Plato, Categoria, Alergeno

class AlergenoSerializer(serializers.ModelSerializer):
    icono = serializers.SerializerMethodField()

    class Meta:
        model = Alergeno
        fields = ['id', 'nombre', 'icono']

    def get_icono(self, alergeno):
        request = self.context.get('request')
        if alergeno.icono and request:
            return request.build_absolute_uri(alergeno.icono.url)
        return None

class PlatoSerializer(serializers.ModelSerializer):
    """Serializador para los detalles de un plato, para ser anidado."""
    alergenos = AlergenoSerializer(many=True, read_only=True)
    imagen = serializers.SerializerMethodField()

    class Meta:
        model = Plato
        # Exponemos solo los campos necesarios para la carta en el frontend.
        fields = ['id', 'nombre', 'descripcion', 'precio', 'alergenos', 'imagen']

    def get_imagen(self, plato):
        request = self.context.get('request')
        if plato.imagen and request:
            return request.build_absolute_uri(plato.imagen.url)
        return None

class CategoriaSerializer(serializers.ModelSerializer):
    """
    Serializador para las categorías, que anida los platos correspondientes.
    """
    # Usamos el PlatoSerializer para anidar la lista de platos.
    # El contexto de la request se pasa automáticamente a los serializadores anidados.
    platos = PlatoSerializer(many=True, read_only=True)

    class Meta:
        model = Categoria
        fields = ['id', 'nombre', 'platos',"descripcion"]
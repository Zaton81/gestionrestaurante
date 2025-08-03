from rest_framework import serializers
from .models import Reserva, Mesa
from django.utils import timezone

class MesaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mesa
        fields = '__all__'

class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = [
            'id', 'nombre_cliente', 'email_cliente', 'telefono_cliente',
            'fecha', 'hora', 'numero_personas', 'notas'
        ]
        read_only_fields = ['id']

    def validate_fecha(self, value):
        if value < timezone.now().date():
            raise serializers.ValidationError("No se pueden hacer reservas para fechas pasadas.")
        return value

    def validate_numero_personas(self, value):
        if value <= 0:
            raise serializers.ValidationError("El número de personas debe ser mayor a 0.")
        if value > 20: # Límite para reservas online
            raise serializers.ValidationError("Para reservas de más de 20 personas, por favor, contáctenos directamente.")
        return value
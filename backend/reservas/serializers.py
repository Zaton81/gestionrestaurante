from rest_framework import serializers
from .models import Reserva, Mesa
from django.utils import timezone
from datetime import time

# Horarios de reserva disponibles.
# TODO: Mover esto a un fichero de configuración o a un modelo de Horarios para evitar duplicación.
HORAS_COMIDA = [time(13, 0), time(13, 30), time(14, 0), time(14, 30), time(15, 0)]
HORAS_CENA = [time(20, 0), time(20, 30), time(21, 0), time(21, 30), time(22, 0)]
TODAS_LAS_HORAS = sorted(HORAS_COMIDA + HORAS_CENA)

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
        """
        Comprueba que la fecha de la reserva no sea en el pasado.
        """
        if value < timezone.now().date():
            raise serializers.ValidationError("No se pueden hacer reservas para fechas pasadas.")
        return value

    def validate_hora(self, value):
        """
        Comprueba que la hora de la reserva sea una de las permitidas.
        """
        if value not in TODAS_LAS_HORAS:
            raise serializers.ValidationError("La hora seleccionada no es una hora de reserva válida.")
        return value

    def validate_numero_personas(self, value):
        """
        Comprueba que el número de personas esté dentro de los límites permitidos.
        """
        if value <= 0:
            raise serializers.ValidationError("El número de personas debe ser mayor a 0.")
        if value > 20: # Límite para reservas online
            raise serializers.ValidationError("Para reservas de más de 20 personas, por favor, contáctenos directamente.")
        return value

    def validate(self, data):
        """
        Comprueba que la hora de la reserva no haya pasado ya en el día de hoy.
        """
        fecha = data.get('fecha')
        hora = data.get('hora')
        now = timezone.now()

        # Solo hacemos esta validación si la reserva es para hoy
        if fecha == now.date() and hora < now.time():
            raise serializers.ValidationError("No se pueden hacer reservas para horas pasadas.")
        
        return data
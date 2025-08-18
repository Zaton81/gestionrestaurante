from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from .models import Mesa, Reserva
from horarios.models import Horario, HorarioEspecial # Importar ambos modelos de horario
from .serializers import ReservaSerializer
from django.utils import timezone
from datetime import time, datetime

# Horarios de reserva disponibles. En el futuro, esto podría venir de un modelo 'Horarios'.
HORAS_COMIDA = [time(13, 0), time(13, 30), time(14, 0), time(14, 30), time(15, 0)]
HORAS_CENA = [time(20, 0), time(20, 30), time(21, 0), time(21, 30), time(22, 0)]
TODAS_LAS_HORAS = sorted(HORAS_COMIDA + HORAS_CENA)

class DisponibilidadView(APIView):
    """
    Verifica las horas disponibles para una fecha y número de personas dados.
    """
    permission_classes = [] # Permitir acceso anónimo

    def get(self, request, *args, **kwargs):
        try:
            fecha_str = request.query_params.get('fecha')
            personas_str = request.query_params.get('personas')

            if not fecha_str or not personas_str:
                return Response({'error': 'Faltan los parámetros "fecha" y "personas".'}, status=status.HTTP_400_BAD_REQUEST)

            fecha = datetime.strptime(fecha_str, '%Y-%m-%d').date()
            personas = int(personas_str)

            if fecha < timezone.now().date():
                 return Response({'error': 'No se puede consultar disponibilidad para fechas pasadas.'}, status=status.HTTP_400_BAD_REQUEST)

        except (ValueError, TypeError):
            return Response({'error': 'Formato de fecha o número de personas inválido.'}, status=status.HTTP_400_BAD_REQUEST)

        # --- NUEVA VALIDACIÓN DE HORARIOS (ESPECIAL Y SEMANAL) ---
        # 1. Comprobar si hay un horario especial para esta fecha.
        try:
            horario_especial = HorarioEspecial.objects.get(fecha=fecha)
            if horario_especial.cerrado:
                return Response({'error': f"Lo sentimos, el restaurante permanecerá cerrado el {fecha.strftime('%d/%m/%Y')} por: {horario_especial.descripcion}."}, status=status.HTTP_400_BAD_REQUEST)
        except HorarioEspecial.DoesNotExist:
            # 2. Si no hay horario especial, comprobar el horario semanal normal.
            dia_semana = fecha.weekday()
            try:
                horario_del_dia = Horario.objects.get(dia_semana=dia_semana)
                if horario_del_dia.cerrado:
                    return Response({'error': 'Lo sentimos, el restaurante permanece cerrado ese día. Por favor, elija otra fecha.'}, status=status.HTTP_400_BAD_REQUEST)
            except Horario.DoesNotExist:
                return Response({'error': 'No hay un horario definido para el día seleccionado.'}, status=status.HTTP_400_BAD_REQUEST)
       

        # 1. Encontrar todas las mesas activas que pueden albergar al número de personas
        mesas_adecuadas = Mesa.objects.filter(capacidad__gte=personas, activa=True)
        if not mesas_adecuadas.exists():
            return Response({'horas_disponibles': []}, status=status.HTTP_200_OK)

        # 2. Obtener todas las reservas confirmadas o pendientes para la fecha dada
        reservas_del_dia = Reserva.objects.filter(
            fecha=fecha,
            estado__in=['PENDIENTE', 'CONFIRMADA']
        )

        # 3. Calcular horas disponibles
        horas_disponibles = []
        for hora in TODAS_LAS_HORAS:
            # Para cada hora, ver si hay al menos una mesa adecuada que esté libre
            mesas_ocupadas_en_esa_hora = reservas_del_dia.filter(hora=hora).values_list('mesa_id', flat=True)
            
            # ¿Existe alguna mesa adecuada que NO esté en la lista de ocupadas?
            if mesas_adecuadas.exclude(id__in=mesas_ocupadas_en_esa_hora).exists():
                horas_disponibles.append(hora.strftime('%H:%M'))

        return Response({'horas_disponibles': horas_disponibles}, status=status.HTTP_200_OK)


class CrearReservaView(generics.CreateAPIView):
    """
    Crea una nueva reserva, asignando automáticamente la mejor mesa disponible.
    Este endpoint requiere que el usuario esté autenticado.
    """
    queryset = Reserva.objects.all()
    serializer_class = ReservaSerializer
    permission_classes = [] # Solo usuarios autenticados pueden crear reservas. DESHABILITADO

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        datos = serializer.validated_data
        
        # --- NUEVA VALIDACIÓN DE HORARIOS  ---
        try:
            horario_especial = HorarioEspecial.objects.get(fecha=datos['fecha'])
            if horario_especial.cerrado:
                return Response({'error': f"No se puede reservar, el restaurante estará cerrado por: {horario_especial.descripcion}."}, status=status.HTTP_400_BAD_REQUEST)
        except HorarioEspecial.DoesNotExist:
            dia_semana = datos['fecha'].weekday()
            try:
                horario_del_dia = Horario.objects.get(dia_semana=dia_semana)
                if horario_del_dia.cerrado:
                    return Response({'error': 'El restaurante está cerrado en la fecha seleccionada.'}, status=status.HTTP_400_BAD_REQUEST)
            except Horario.DoesNotExist:
                return Response({'error': 'No es posible reservar en el día seleccionado.'}, status=status.HTTP_400_BAD_REQUEST)
        # --- FIN DE LA NUEVA VALIDACIÓN ---

        # Volver a comprobar la disponibilidad para evitar que dos personas reserven a la vez (race condition)
        mesas_ocupadas = Reserva.objects.filter(fecha=datos['fecha'], hora=datos['hora'], estado__in=['PENDIENTE', 'CONFIRMADA']).values_list('mesa_id', flat=True)
        mesa_disponible = Mesa.objects.filter(capacidad__gte=datos['numero_personas'], activa=True).exclude(id__in=mesas_ocupadas).order_by('capacidad').first()

        if not mesa_disponible:
            return Response({'error': 'Lo sentimos, ya no hay mesas disponibles para la hora seleccionada. Por favor, elija otra.'}, status=status.HTTP_409_CONFLICT)

        serializer.save(mesa=mesa_disponible)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

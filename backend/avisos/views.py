from django.shortcuts import render
from rest_framework import viewsets
from .models import Aviso
from .serializers import AvisoSerializer
from django.utils import timezone
from django.db import models

# Create your views here.

class AvisoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Un ViewSet para ver los avisos activos.

    Este ViewSet muestra los avisos que están marcados como visibles y que se encuentran
    dentro de su rango de fechas de publicación. Los resultados se ordenan por el campo
    'orden' y, en segundo lugar, por la fecha de modificación más reciente.
    """
    serializer_class = AvisoSerializer

    def get_queryset(self):
        """
        Filtra los avisos para devolver solo los activos y visibles.

        Un aviso se considera activo si:
        - Está marcado como 'visible'.
        - La fecha actual es posterior o igual a la 'fecha_inicio' (si existe).
        - La fecha actual es anterior o igual a la 'fecha_fin' (si existe).

        Returns:
            QuerySet: Una lista de objetos Aviso que cumplen con los criterios.
        """
        hoy = timezone.now().date()
        return Aviso.objects.filter(
            visible=True
        ).filter(
            models.Q(fecha_inicio__isnull=True) | models.Q(fecha_inicio__lte=hoy),
            models.Q(fecha_fin__isnull=True) | models.Q(fecha_fin__gte=hoy)
        ).order_by('orden', '-fecha_modificacion')

from django.shortcuts import render
from rest_framework import viewsets
from .models import Plato, Categoria
from .serializers import PlatoSerializer, CategoriaSerializer
from django.utils import timezone
from django.db.models import Prefetch

# Create your views here.

class PlatoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Un ViewSet para ver TODOS los platos disponibles en la carta (lista plana).
    """
    serializer_class = PlatoSerializer
    queryset = Plato.objects.filter(disponible=True)

class CategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Un ViewSet para ver la carta completa, organizada por categorías.
    Solo muestra categorías activas y platos disponibles.
    """
    serializer_class = CategoriaSerializer
    
    def get_queryset(self):
        """
        Queryset optimizado que obtiene categorías activas y precarga
        únicamente los platos disponibles para cada una.
        """
        platos_disponibles = Plato.objects.filter(disponible=True).order_by('orden')
        return Categoria.objects.filter(activa=True).prefetch_related(
            Prefetch('platos', queryset=platos_disponibles)
        ).order_by('orden')
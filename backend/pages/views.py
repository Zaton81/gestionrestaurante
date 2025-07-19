from django.shortcuts import render
from rest_framework import viewsets
from .models import Pagina
from .serializers import PaginaSerializer

# Create your views here.

class PaginaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Pagina.objects.filter(visible=True)
    serializer_class = PaginaSerializer
    lookup_field = 'slug'

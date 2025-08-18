from django.contrib import admin
from .models import Aviso

@admin.register(Aviso)
class AvisoAdmin(admin.ModelAdmin):
    """
    Configuración del panel de administración para el modelo Aviso.

    Define cómo se muestra y se gestiona el modelo Aviso en la
    interfaz de administración de Django.
    """
    list_display = ('titulo', 'visible', 'fecha_inicio', 'fecha_fin', 'orden', 'fecha_modificacion')
    list_filter = ('visible',)
    search_fields = ('titulo', 'contenido')
    ordering = ('orden', '-fecha_modificacion')

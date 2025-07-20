from django.contrib import admin
from .models import Aviso

@admin.register(Aviso)
class AvisoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'visible', 'fecha_inicio', 'fecha_fin', 'orden', 'fecha_modificacion')
    list_filter = ('visible',)
    search_fields = ('titulo', 'contenido')
    ordering = ('orden', '-fecha_modificacion')

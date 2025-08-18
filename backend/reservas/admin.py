from django.contrib import admin
from .models import Mesa, Reserva

@admin.register(Mesa)
class MesaAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Mesa model.
    """
    list_display = ('numero', 'capacidad', 'disponible', 'ubicacion', 'activa')
    list_filter = ('disponible', 'activa', 'ubicacion')
    search_fields = ('numero', 'ubicacion')

@admin.register(Reserva)
class ReservaAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Reserva model.
    """
    list_display = ('nombre_cliente', 'fecha', 'hora', 'numero_personas', 'mesa', 'estado', 'creada_en')
    list_filter = ('estado', 'fecha', 'mesa')
    search_fields = ('nombre_cliente', 'email_cliente', 'telefono_cliente')
    ordering = ('-fecha', '-hora')
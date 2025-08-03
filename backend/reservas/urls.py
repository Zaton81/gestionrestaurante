from django.urls import path
from .views import DisponibilidadView, CrearReservaView

urlpatterns = [
    path('reservas/disponibilidad/', DisponibilidadView.as_view(), name='ver-disponibilidad'),
    path('reservas/crear/', CrearReservaView.as_view(), name='crear-reserva'),
]
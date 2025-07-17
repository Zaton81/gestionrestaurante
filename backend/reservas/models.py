# reservas/models.py
from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone

class Mesa(models.Model):
    numero = models.PositiveIntegerField(unique=True, verbose_name="Número de Mesa")
    capacidad = models.PositiveIntegerField(verbose_name="Capacidad (Comensales)")
    disponible = models.BooleanField(default=True, verbose_name="Disponible")
    ubicacion = models.CharField(max_length=100, blank=True, null=True, verbose_name="Ubicación")
    activa = models.BooleanField(default=True, verbose_name="Mesa Activa")
    
    class Meta:
        verbose_name = "Mesa"
        verbose_name_plural = "Mesas"
        ordering = ['numero']

    def __str__(self):
        return f"Mesa {self.numero} ({self.capacidad} comensales)"

    def clean(self):
        if self.capacidad <= 0:
            raise ValidationError("La capacidad debe ser mayor a 0")
        if self.capacidad > 20:
            raise ValidationError("La capacidad no puede ser mayor a 20 comensales")

    def esta_disponible_para_fecha_hora(self, fecha, hora):
        """Verifica si la mesa está disponible para una fecha y hora específica"""
        return not self.reserva_set.filter(
            fecha=fecha,
            hora=hora,
            estado__in=['PENDIENTE', 'CONFIRMADA']
        ).exists()

class Reserva(models.Model):
    ESTADOS = [
        ('PENDIENTE', 'Pendiente de Confirmación'),
        ('CONFIRMADA', 'Confirmada'),
        ('CANCELADA', 'Cancelada'),
        ('COMPLETADA', 'Completada'),
    ]
    
    nombre_cliente = models.CharField(max_length=200, verbose_name="Nombre del Cliente")
    email_cliente = models.EmailField(verbose_name="Email del Cliente")
    telefono_cliente = models.CharField(max_length=15, verbose_name="Teléfono del Cliente")
    fecha = models.DateField(verbose_name="Fecha")
    hora = models.TimeField(verbose_name="Hora")
    numero_personas = models.PositiveIntegerField(verbose_name="Número de Personas")
    mesa = models.ForeignKey(Mesa, on_delete=models.CASCADE, verbose_name="Mesa", null=True, blank=True)
    empleado_asignado = models.ForeignKey('empleados.Empleado', on_delete=models.SET_NULL, verbose_name="Empleado Asignado", null=True, blank=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='PENDIENTE', verbose_name="Estado")
    creada_en = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    modificada_en = models.DateTimeField(auto_now=True, verbose_name="Última Modificación")
    notas = models.TextField(blank=True, null=True, verbose_name="Notas Adicionales")
    confirmada_por = models.CharField(max_length=100, blank=True, null=True, verbose_name="Confirmada Por")

    class Meta:
        verbose_name = "Reserva"
        verbose_name_plural = "Reservas"
        ordering = ['-fecha', '-hora']

    def __str__(self):
        return f"Reserva de {self.nombre_cliente} para el {self.fecha} a las {self.hora}"

    def clean(self):
        # Validar que la fecha no sea en el pasado
        if self.fecha < timezone.now().date():
            raise ValidationError("No se pueden hacer reservas para fechas pasadas")
        
        # Validar que el número de personas sea razonable
        if self.numero_personas <= 0:
            raise ValidationError("El número de personas debe ser mayor a 0")
        if self.numero_personas > 20:
            raise ValidationError("El número de personas no puede ser mayor a 20")
        
        # Validar que la mesa tenga capacidad suficiente
        if self.mesa and self.numero_personas > self.mesa.capacidad:
            raise ValidationError(f"La mesa {self.mesa.numero} solo tiene capacidad para {self.mesa.capacidad} personas")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
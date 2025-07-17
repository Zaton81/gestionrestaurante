from django.db import models
from django.core.exceptions import ValidationError

class Horario(models.Model):
    DIAS_SEMANA = [
        (0, 'Lunes'),
        (1, 'Martes'),
        (2, 'Miércoles'),
        (3, 'Jueves'),
        (4, 'Viernes'),
        (5, 'Sábado'),
        (6, 'Domingo'),
    ]
    
    dia_semana = models.IntegerField(choices=DIAS_SEMANA, verbose_name="Día de la Semana")
    hora_apertura = models.TimeField(verbose_name="Hora de Apertura")
    hora_cierre = models.TimeField(verbose_name="Hora de Cierre")
    cerrado = models.BooleanField(default=False, verbose_name="Cerrado")
    activo = models.BooleanField(default=True, verbose_name="Horario Activo")
    
    class Meta:
        verbose_name = "Horario"
        verbose_name_plural = "Horarios"
        ordering = ['dia_semana']
        unique_together = ['dia_semana']

    def __str__(self):
        if self.cerrado:
            return f"{self.get_dia_semana_display()} - Cerrado"
        return f"{self.get_dia_semana_display()} - {self.hora_apertura} a {self.hora_cierre}"

    def clean(self):
        if not self.cerrado and self.hora_apertura >= self.hora_cierre:
            raise ValidationError("La hora de apertura debe ser anterior a la hora de cierre")

class HorarioEspecial(models.Model):
    TIPOS = [
        ('FESTIVO', 'Festivo'),
        ('VACACIONES', 'Vacaciones'),
        ('EVENTO', 'Evento Especial'),
        ('MANTENIMIENTO', 'Mantenimiento'),
    ]
    
    fecha = models.DateField(verbose_name="Fecha")
    tipo = models.CharField(max_length=20, choices=TIPOS, verbose_name="Tipo")
    hora_apertura = models.TimeField(blank=True, null=True, verbose_name="Hora de Apertura")
    hora_cierre = models.TimeField(blank=True, null=True, verbose_name="Hora de Cierre")
    cerrado = models.BooleanField(default=False, verbose_name="Cerrado")
    descripcion = models.TextField(blank=True, null=True, verbose_name="Descripción")
    
    class Meta:
        verbose_name = "Horario Especial"
        verbose_name_plural = "Horarios Especiales"
        ordering = ['-fecha']
        unique_together = ['fecha']

    def __str__(self):
        if self.cerrado:
            return f"{self.fecha} - {self.get_tipo_display()} - Cerrado"
        return f"{self.fecha} - {self.get_tipo_display()} - {self.hora_apertura} a {self.hora_cierre}"

    def clean(self):
        if not self.cerrado:
            if not self.hora_apertura or not self.hora_cierre:
                raise ValidationError("Debe especificar hora de apertura y cierre si no está cerrado")
            if self.hora_apertura >= self.hora_cierre:
                raise ValidationError("La hora de apertura debe ser anterior a la hora de cierre")

class ConfiguracionHorarios(models.Model):
    nombre = models.CharField(max_length=100, verbose_name="Nombre de la Configuración")
    intervalo_reservas = models.PositiveIntegerField(default=30, verbose_name="Intervalo de Reservas (minutos)")
    anticipacion_minima = models.PositiveIntegerField(default=60, verbose_name="Anticipación Mínima (minutos)")
    anticipacion_maxima = models.PositiveIntegerField(default=30, verbose_name="Anticipación Máxima (días)")
    duracion_reserva = models.PositiveIntegerField(default=120, verbose_name="Duración de Reserva (minutos)")
    activa = models.BooleanField(default=True, verbose_name="Configuración Activa")
    
    class Meta:
        verbose_name = "Configuración de Horarios"
        verbose_name_plural = "Configuraciones de Horarios"

    def __str__(self):
        return self.nombre

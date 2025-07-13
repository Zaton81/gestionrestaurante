from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class Rol(models.Model):
    nombre = models.CharField(max_length=100, unique=True, verbose_name="Nombre del Rol")
    descripcion = models.TextField(blank=True, null=True, verbose_name="Descripción")
    salario_base = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True, verbose_name="Salario Base")
    activo = models.BooleanField(default=True, verbose_name="Rol Activo")
    
    class Meta:
        verbose_name = "Rol"
        verbose_name_plural = "Roles"
        ordering = ['nombre']

    def __str__(self):
        return self.nombre

class Empleado(models.Model):
    ESTADOS = [
        ('ACTIVO', 'Activo'),
        ('INACTIVO', 'Inactivo'),
        ('VACACIONES', 'Vacaciones'),
        ('BAJA', 'Baja'),
    ]
    
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name="Usuario")
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, verbose_name="Rol")
    telefono = models.CharField(max_length=15, blank=True, null=True, verbose_name="Teléfono")
    direccion = models.TextField(blank=True, null=True, verbose_name="Dirección")
    fecha_contratacion = models.DateField(verbose_name="Fecha de Contratación")
    fecha_nacimiento = models.DateField(blank=True, null=True, verbose_name="Fecha de Nacimiento")
    estado = models.CharField(max_length=20, choices=ESTADOS, default='ACTIVO', verbose_name="Estado")
    foto = models.ImageField(upload_to='empleados/', blank=True, null=True, verbose_name="Foto")
    activo = models.BooleanField(default=True, verbose_name="Empleado Activo")
    
    class Meta:
        verbose_name = "Empleado"
        verbose_name_plural = "Empleados"
        ordering = ['usuario__first_name', 'usuario__last_name']

    def __str__(self):
        return f"{self.usuario.get_full_name()} - {self.rol.nombre}"

class Turno(models.Model):
    TIPOS_TURNO = [
        ('MAÑANA', 'Mañana'),
        ('TARDE', 'Tarde'),
        ('NOCHE', 'Noche'),
        ('COMPLETO', 'Completo'),
    ]
    
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE, verbose_name="Empleado")
    fecha = models.DateField(verbose_name="Fecha")
    tipo_turno = models.CharField(max_length=20, choices=TIPOS_TURNO, verbose_name="Tipo de Turno")
    hora_inicio = models.TimeField(verbose_name="Hora de Inicio")
    hora_fin = models.TimeField(verbose_name="Hora de Fin")
    descripcion = models.TextField(blank=True, null=True, verbose_name="Descripción")
    completado = models.BooleanField(default=False, verbose_name="Turno Completado")
    
    class Meta:
        verbose_name = "Turno"
        verbose_name_plural = "Turnos"
        ordering = ['-fecha', 'hora_inicio']

    def __str__(self):
        return f"{self.empleado} - {self.fecha} ({self.get_tipo_turno_display()})"

    def clean(self):
        if self.hora_inicio >= self.hora_fin:
            raise ValidationError("La hora de inicio debe ser anterior a la hora de fin")

class AsignacionMesa(models.Model):
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE, verbose_name="Empleado")
    mesa = models.ForeignKey('reservas.Mesa', on_delete=models.CASCADE, verbose_name="Mesa")
    fecha = models.DateField(verbose_name="Fecha")
    hora_inicio = models.TimeField(verbose_name="Hora de Inicio")
    hora_fin = models.TimeField(blank=True, null=True, verbose_name="Hora de Fin")
    activa = models.BooleanField(default=True, verbose_name="Asignación Activa")
    
    class Meta:
        verbose_name = "Asignación de Mesa"
        verbose_name_plural = "Asignaciones de Mesas"
        ordering = ['-fecha', 'hora_inicio']

    def __str__(self):
        return f"{self.empleado} - Mesa {self.mesa.numero} - {self.fecha}"

    def clean(self):
        if self.hora_inicio >= self.hora_fin:
            raise ValidationError("La hora de inicio debe ser anterior a la hora de fin")

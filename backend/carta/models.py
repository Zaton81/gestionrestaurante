from django.db import models
from django.core.exceptions import ValidationError
from ckeditor.fields import RichTextField

# Create your models here.

class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True, verbose_name="Tipo")
    descripcion = RichTextField(blank=True, null=True, verbose_name="Descripción")
    orden = models.PositiveIntegerField(default=0, verbose_name="Orden de Visualización")
    activa = models.BooleanField(default=True, verbose_name="Categoría Activa")

    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"
        ordering = ['orden', 'nombre']

    def __str__(self):
        return self.nombre

class Alergeno(models.Model):
    nombre = models.CharField(max_length=100, unique=True, verbose_name="Nombre")
    icono = models.ImageField(upload_to='alergenos/', blank=True, null=True, verbose_name="Icono")
    descripcion = models.TextField(blank=True, null=True, verbose_name="Descripción")
    

    class Meta:
        verbose_name = "Alérgeno"
        verbose_name_plural = "Alérgenos"
        ordering = ['nombre']

    def __str__(self):
        return self.nombre

class Plato(models.Model):
    TIPOS_PLATO = [
        ('ENTRANTE', 'Entrante'),
        ('PRINCIPAL', 'Plato Principal'),
        ('POSTRE', 'Postre'),
        ('BEBIDA', 'Bebida'),
        ('ESPECIAL', 'Especial del Día'),
    ]
    
    nombre = models.CharField(max_length=200, verbose_name="Nombre")
    descripcion = RichTextField(verbose_name="Descripción")
    precio = models.DecimalField(max_digits=6, decimal_places=2, verbose_name="Precio")
    categoria = models.ForeignKey(Categoria, related_name='platos', on_delete=models.CASCADE, verbose_name="Categoría")
    tipo_plato = models.CharField(max_length=20, choices=TIPOS_PLATO, default='PRINCIPAL', verbose_name="Tipo de Plato")
    alergenos = models.ManyToManyField(Alergeno, blank=True, verbose_name="Alérgenos")
    imagen = models.ImageField(upload_to='platos/', blank=True, null=True, verbose_name="Imagen")
    disponible = models.BooleanField(default=True, verbose_name="Disponible")
    tiempo_preparacion = models.PositiveIntegerField(default=15, verbose_name="Tiempo de Preparación (minutos)")
    popularidad = models.PositiveIntegerField(default=0, verbose_name="Contador de Popularidad")
    ingredientes = models.TextField(blank=True, null=True, verbose_name="Ingredientes")
    calorias = models.PositiveIntegerField(blank=True, null=True, verbose_name="Calorías")
    es_vegetariano = models.BooleanField(default=False, verbose_name="Es Vegetariano")
    es_vegano = models.BooleanField(default=False, verbose_name="Es Vegano")
    es_sin_gluten = models.BooleanField(default=False, verbose_name="Sin Gluten")
    orden = models.PositiveIntegerField(default=0, verbose_name="Orden en la Carta")
    creado_en = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    modificado_en = models.DateTimeField(auto_now=True, verbose_name="Última Modificación")

    class Meta:
        verbose_name = "Plato"
        verbose_name_plural = "Platos"
        ordering = ['categoria__orden', 'orden', 'nombre']

    def __str__(self):
        return self.nombre

    def clean(self):
        if self.precio <= 0:
            raise ValidationError("El precio debe ser mayor a 0")
        if self.precio > 999.99:
            raise ValidationError("El precio no puede ser mayor a 999.99")
        if self.tiempo_preparacion <= 0:
            raise ValidationError("El tiempo de preparación debe ser mayor a 0")
        if self.tiempo_preparacion > 120:
            raise ValidationError("El tiempo de preparación no puede ser mayor a 120 minutos")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

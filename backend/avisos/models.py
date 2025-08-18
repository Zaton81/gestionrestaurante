from django.db import models
from ckeditor.fields import RichTextField

class Aviso(models.Model):
    titulo = models.CharField(max_length=200, verbose_name="Título", blank=True)
    contenido = RichTextField(verbose_name="Contenido (HTML permitido)")
    visible = models.BooleanField(default=True, verbose_name="Visible")
    orden = models.PositiveIntegerField(default=0, verbose_name="Orden de aparición")
    fecha_inicio = models.DateField(null=True, blank=True, verbose_name="Mostrar desde")
    fecha_fin = models.DateField(null=True, blank=True, verbose_name="Mostrar hasta")
    fecha_modificacion = models.DateTimeField(auto_now=True, verbose_name="Última modificación")

    class Meta:
        verbose_name = "Aviso"
        verbose_name_plural = "Avisos"
        ordering = ['orden', '-fecha_modificacion']

    def __str__(self):
        """
        Devuelve el título del aviso o un identificador genérico si no tiene título.
        """
        return self.titulo or f"Aviso {self.id}"

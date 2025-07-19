from django.db import models
from ckeditor.fields import RichTextField

# Create your models here.

class Pagina(models.Model):
    slug = models.SlugField(
        max_length=50,
        unique=True,
        verbose_name="Identificador"
    )
    titulo = models.CharField(max_length=200, verbose_name="Título")
    contenido = RichTextField(verbose_name="Contenido (HTML permitido)")
    visible = models.BooleanField(default=True, verbose_name="Visible en la web")
    fecha_modificacion = models.DateTimeField(auto_now=True, verbose_name="Última modificación")

    class Meta:
        verbose_name = "Página legal/informativa"
        verbose_name_plural = "Páginas legales/informativas"
        ordering = ['slug']

    def __str__(self):
        return self.titulo

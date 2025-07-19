from django.db import models

# Create your models here.

class SocialLink(models.Model):
    REDES = [
        ('facebook', 'Facebook'),
        ('instagram', 'Instagram'),
        ('twitter', 'Twitter'),
        ('whatsapp', 'WhatsApp'),
        ('tiktok', 'TikTok'),
        ('maps', 'Google Maps'),
        ('web', 'Web'),
        ('otro', 'Otro'),
    ]

    nombre = models.CharField(max_length=50, verbose_name="Nombre")
    tipo = models.CharField(max_length=20, choices=REDES, verbose_name="Tipo de Red")
    url = models.URLField(verbose_name="Enlace")
    icono = models.CharField(max_length=50, blank=True, null=True, verbose_name="Clase de icono (opcional)")
    visible = models.BooleanField(default=True, verbose_name="Visible")
    orden = models.PositiveIntegerField(default=0, verbose_name="Orden de aparición")

    class Meta:
        verbose_name = "Enlace social"
        verbose_name_plural = "Enlaces sociales"
        ordering = ['orden', 'tipo']

    def __str__(self):
        return f"{self.get_tipo_display()} - {self.nombre}"

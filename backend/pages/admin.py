from django.contrib import admin
from .models import Pagina

@admin.register(Pagina)
class PaginaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'slug', 'visible', 'fecha_modificacion')
    list_filter = ('visible',)
    search_fields = ('titulo', 'contenido', 'slug')
    prepopulated_fields = {"slug": ("titulo",)}
    ordering = ('slug',)

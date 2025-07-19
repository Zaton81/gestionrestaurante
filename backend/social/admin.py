from django.contrib import admin
from .models import SocialLink

@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'tipo', 'url', 'visible', 'orden')
    list_filter = ('tipo', 'visible')
    search_fields = ('nombre', 'url')
    ordering = ('orden', 'tipo')

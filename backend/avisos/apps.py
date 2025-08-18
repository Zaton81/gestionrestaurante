from django.apps import AppConfig


class AvisosConfig(AppConfig):
    """
    Configuración de la aplicación 'avisos'.

    Esta clase define los metadatos de la aplicación, como el tipo de
    campo de autoincremento por defecto y el nombre de la aplicación.
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'avisos'

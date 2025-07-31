from django.urls import include, path
from .views import HelloWorldView

urlpatterns = [
    path('hello/', HelloWorldView.as_view(), name='hello-world'),
    # Agrupamos aquí todas las URLs de la API. He añadido 'avisos.urls' que faltaba.
    # path('avisos/', include('avisos.urls')),
    path('horarios/', include('horarios.urls')),
    path('carta/', include('carta.urls')),
]

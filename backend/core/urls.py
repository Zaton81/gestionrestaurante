from django.urls import include, path
from .views import HelloWorldView

urlpatterns = [
    path('hello/', HelloWorldView.as_view(), name='hello-world'),
    path('horarios/', include('horarios.urls')),
    path('carta/', include('carta.urls')),
]

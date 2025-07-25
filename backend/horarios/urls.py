from django.urls import path
from .views import HorarioListView

urlpatterns = [
    path('', HorarioListView.as_view(), name='lista-horarios'),
]


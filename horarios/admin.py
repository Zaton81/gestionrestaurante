from django.contrib import admin
from .models import Horario, HorarioEspecial, ConfiguracionHorarios

admin.site.register(Horario)
admin.site.register(HorarioEspecial)
admin.site.register(ConfiguracionHorarios)

from django.contrib import admin
from .models import Rol, Empleado, Turno, AsignacionMesa

admin.site.register(Rol)
admin.site.register(Empleado)
admin.site.register(Turno)
admin.site.register(AsignacionMesa)

# Restaurante - Gestión Integral en construcción

Este proyecto es una aplicación web para la gestión integral de un restaurante, desarrollada con Django.

## Características principales
- Gestión de reservas y mesas
- Gestión de carta y platos
- Control de empleados y turnos
- Configuración de horarios y días especiales
- Panel de administración personalizado

## Requisitos
- Python 3.10+
- Django 5+
- Pillow

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/nombre_repositorio.git
   cd nombre_repositorio
   ```
2. Crea y activa un entorno virtual:
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```
3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```
4. Realiza las migraciones:
   ```bash
   python manage.py migrate
   ```
5. Crea un superusuario:
   ```bash
   python manage.py createsuperuser
   ```
6. Ejecuta el servidor:
   ```bash
   python manage.py runserver
   ```

## Estructura del proyecto
- `carta/` — Gestión de la carta, platos, categorías y alérgenos
- `reservas/` — Gestión de reservas y mesas
- `empleados/` — Gestión de empleados, roles y turnos
- `horarios/` — Configuración de horarios y días especiales
- `core/` — Funcionalidades base
- `config/` — Configuración principal del proyecto

## Notas
- El panel de administración está personalizado y en español.
- Recuerda configurar correctamente los archivos estáticos y de medios para producción.

---

> 

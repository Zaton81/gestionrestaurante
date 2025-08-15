# Restaurante - Gestión Integral

Este proyecto es una aplicación web completa para la gestión integral de un restaurante, que incluye tanto un backend robusto desarrollado con Django como un frontend interactivo construido con React y TypeScript.

## Características Principales

-   **Gestión de Reservas:** Permite a los clientes realizar reservas y al personal gestionarlas.
-   **Carta Digital:** Muestra la carta del restaurante con categorías, platos y alérgenos.
-   **Gestión de Empleados:** Control de información de empleados, roles y turnos.
-   **Horarios y Días Especiales:** Configuración flexible de horarios de apertura y eventos especiales.
-   **Páginas Informativas:** Sección para avisos, contacto y otras páginas estáticas.
-   **Panel de Administración:** Interfaz personalizada para la gestión interna del restaurante.

## Tecnologías Utilizadas

### Backend

-   **Python 3.10+**
-   **Django 5+:** Framework web para el desarrollo rápido y seguro.
-   **Django REST Framework:** Para la creación de APIs RESTful.
-   **Pillow:** Librería para el manejo de imágenes.

### Frontend

-   **React:** Librería de JavaScript para construir interfaces de usuario interactivas.
-   **TypeScript:** Superset de JavaScript que añade tipado estático.
-   **React Router DOM:** Para la navegación y el enrutamiento en la aplicación de una sola página (SPA).
-   **React-Bootstrap:** Componentes de Bootstrap reconstruidos para React, facilitando el diseño responsivo.
-   **Axios:** Cliente HTTP basado en promesas para realizar peticiones a la API.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

-   [Python 3.10+](https://www.python.org/downloads/)
-   [Node.js y npm](https://nodejs.org/en/download/) (npm se instala con Node.js)
-   [Git](https://git-scm.com/downloads/)

## Configuración del Proyecto

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local.

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd Restaurante
```

### 2. Configuración del Backend (Django)

Navega al directorio `backend`:

```bash
cd backend
```

Crea y activa un entorno virtual (recomendado):

```bash
python -m venv venv
# En Windows:
venc\Scripts\activate
# En macOS/Linux:
source venv/bin/activate
```

Instala las dependencias de Python:

```bash
pip install -r requirements.txt
```

Realiza las migraciones de la base de datos:

```bash
python manage.py migrate
```

Crea un superusuario para acceder al panel de administración (opcional):

```bash
python manage.py createsuperuser
```

Inicia el servidor de desarrollo de Django:

```bash
python manage.py runserver
```

El backend estará disponible en `http://localhost:8000/`.

### 3. Configuración del Frontend (React)

Abre una nueva terminal y navega al directorio `frontend`:

```bash
cd ../frontend
```

Instala las dependencias de Node.js:

```bash
npm install
# o si usas yarn:
yarn install
```

Inicia el servidor de desarrollo de React:

```bash
npm start
# o si usas yarn:
yarn start
```

El frontend se abrirá en tu navegador predeterminado, generalmente en `http://localhost:3000/`.

## Estructura del Proyecto

-   `backend/`: Contiene todo el código del servidor Django.
    -   `config/`: Configuración principal del proyecto Django.
    -   `[nombre_app]/`: Directorios para cada aplicación Django (e.g., `carta`, `reservas`, `empleados`, `horarios`, `avisos`, `contacto`, `pages`, `social`, `core`).
    -   `media/`: Archivos multimedia subidos (imágenes de platos, etc.).
-   `frontend/`: Contiene todo el código de la aplicación React.
    -   `public/`: Archivos estáticos y `index.html`.
    -   `src/`: Código fuente de React.
        -   `assets/`: Imágenes y otros recursos estáticos.
        -   `components/`: Componentes reutilizables de React.
        -   `config/`: Archivos de configuración del frontend (e.g., constantes de API).
        -   `pages/`: Componentes de página (vistas principales).
        -   `services/`: Lógica para interactuar con la API del backend.
-   `venv/`: Entorno virtual de Python (generado automáticamente).
-   `node_modules/`: Dependencias de Node.js (generado automáticamente).

## Endpoints de la API (Ejemplos)

El backend expone varias APIs RESTful. Algunos ejemplos incluyen:

-   `/api/contacto/`: Para enviar mensajes de contacto.
-   `/api/reservas/`: Para gestionar reservas.
-   `/api/carta/`: Para obtener información sobre la carta y los platos.
-   `/api/avisos/`: Para gestionar avisos y notificaciones.
-   `/api/pages/`: Para gestionar páginas estáticas.

## Notas Adicionales

-   Asegúrate de que el backend (`http://localhost:8000`) esté corriendo antes de iniciar el frontend para que la aplicación funcione correctamente.
-   Para despliegue en producción, considera configurar variables de entorno para las URLs de la API y otros ajustes sensibles.

---

**¡Disfruta desarrollando tu aplicación de restaurante!**
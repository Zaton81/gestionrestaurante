from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail, BadHeaderError
from django.conf import settings
from .serializers import ContactoSerializer
import logging

# Obtener un logger para este módulo para una mejor depuración
logger = logging.getLogger(__name__)

class ContactoView(APIView):
    """
    API view para manejar el formulario de contacto.
    Permite acceso anónimo para que cualquiera pueda enviar un mensaje.
    """
    permission_classes = []

    def post(self, request, *args, **kwargs):
        serializer = ContactoSerializer(data=request.data)
        if serializer.is_valid():
            nombre = serializer.validated_data['nombre']
            email = serializer.validated_data['email']
            telefono = serializer.validated_data.get('telefono', 'No proporcionado')
            mensaje = serializer.validated_data['mensaje']

            cuerpo_email = f"""
            Nuevo mensaje de contacto recibido desde la web:

            Nombre: {nombre}
            Email de respuesta: {email}
            Teléfono: {telefono}

            Mensaje:
            {mensaje}
            """

            try:
                send_mail(
                    subject=f'Nuevo mensaje de contacto de: {nombre}',
                    message=cuerpo_email,
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.ADMIN_EMAIL],
                    fail_silently=False,
                )
                return Response({'mensaje': '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.'}, status=status.HTTP_200_OK)
            except BadHeaderError:
                logger.warning("Intento de inyección de cabecera en el formulario de contacto.")
                return Response({'error': 'Cabecera no válida.'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                logger.error(f"Error al enviar email de contacto: {e}")
                return Response(
                    {'error': 'Hubo un problema al enviar el correo. Por favor, inténtalo más tarde.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
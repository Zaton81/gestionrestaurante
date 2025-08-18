from rest_framework.routers import DefaultRouter
from .views import PlatoViewSet, CategoriaViewSet

router = DefaultRouter()
# Endpoint para una lista de todos los platos
router.register(r'platos', PlatoViewSet, basename='plato')
# endpoint para la carta estructurada por categorías
router.register(r'categorias', CategoriaViewSet, basename='categoria')

urlpatterns = router.urls
from rest_framework.routers import DefaultRouter
from .views import PaginaViewSet

router = DefaultRouter()
router.register(r'pages', PaginaViewSet, basename='pagina')

urlpatterns = router.urls 
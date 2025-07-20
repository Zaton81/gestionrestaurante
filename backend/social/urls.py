from rest_framework.routers import DefaultRouter
from .views import SocialLinkViewSet

router = DefaultRouter()
router.register(r'social', SocialLinkViewSet, basename='sociallink')

urlpatterns = router.urls 
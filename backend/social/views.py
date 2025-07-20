from django.shortcuts import render
from rest_framework import viewsets
from .models import SocialLink
from .serializers import SocialLinkSerializer

# Create your views here.

class SocialLinkViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SocialLink.objects.filter(visible=True)
    serializer_class = SocialLinkSerializer
    lookup_field = 'id'

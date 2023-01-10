from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics
from django_react.permissions import DrDjangoModelPermissions


class LeadListCreate(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [DrDjangoModelPermissions]


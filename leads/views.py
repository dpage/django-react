from .models import Lead
from .serializers import LeadSerializer
from rest_framework import generics
from rest_framework import permissions


class LeadListCreate(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    queryset = Lead.objects.all()
    serializer_class = LeadSerializer


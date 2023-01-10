from django.contrib import admin
from .models import Lead


class LeadAdmin(admin.ModelAdmin):
    pass

admin.site.register(Lead, LeadAdmin)
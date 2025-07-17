from django.contrib import admin
from django.urls import path, include
urlpatterns = [
path('admin/', admin.site.urls),
path('api/', include('movies.urls')), # Esto activa todas las rutas de la app movies,
path('', include('loginapp.urls')),
]
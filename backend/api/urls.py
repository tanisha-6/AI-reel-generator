from django.urls import path
from .views import (
    register_user,
    generate_script,
    current_user,
    get_projects
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('register/', register_user),

    path('login/', TokenObtainPairView.as_view()),

    path('token/refresh/', TokenRefreshView.as_view()),

    path('generate-script/', generate_script),

    path('me/', current_user),

    path('projects/',get_projects),
]
from django.urls import path

from src.views.auths import GetAccessTokenAuth
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
  path('login/', GetAccessTokenAuth.as_view(), name='login-view'),
  path('refresh/', TokenRefreshView.as_view()),
]

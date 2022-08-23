from django.urls import path

from src.views.users import *

urlpatterns = [
  path('', UserCreateListView.as_view()),
  path('single/<str:id>/', SingleUserActionsView.as_view()),
  path('update-password/<str:id>/', UpdatePasswordView.as_view())
]
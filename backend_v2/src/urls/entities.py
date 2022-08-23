from django.urls import path

from src.views.entities import ListCreateEntityView, SingleEntityView

urlpatterns = [
  path('', ListCreateEntityView.as_view(), name='list-create-entity-view'),
  path('single/<str:id>/', SingleEntityView.as_view(), name='single-entity-view'),
]

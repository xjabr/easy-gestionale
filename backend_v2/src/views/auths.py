from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView

from src.serializers.auths import SerializerJWTToken


class GetAccessTokenAuth(TokenObtainPairView):
	serializer_class = SerializerJWTToken

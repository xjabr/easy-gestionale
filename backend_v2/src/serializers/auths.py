from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class SerializerJWTToken(TokenObtainPairSerializer):
  def validate(self, attrs):
    data = super().validate(attrs)
    return { 'token': data['access'] }

  def get_token(cls, user):
    token = super().get_token(user)
    
    token['username'] = user.username
    token['email'] = user.email
    token['role'] = user.role
    token['is_staff'] = user.is_staff
    token['is_activate'] = user.is_active
    
    return token
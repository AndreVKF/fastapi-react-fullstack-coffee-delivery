from uuid import UUID

from src.schemas.auth import AuthResponse
from src.services.jwt import JWT

class RefreshToken:
    def __init__(self) -> None:
        pass
    
    def execute(self, token: str) -> AuthResponse:
        _JWT = JWT()

        decodedToken = _JWT.decode(token=token)
        userId = decodedToken["userId"]
        
        newToken = _JWT.createToken(UUID(userId))
        
        return AuthResponse(userId=userId, token=newToken, token_type="Bearer")

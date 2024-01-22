import datetime as dt

from uuid import UUID
from jose import jwt, ExpiredSignatureError

from src.configs.settings import settings
from src.errors.expired_token_error import expiredTokenError
from src.errors.invalid_authorization_token_error import invalidAuthorizatinoTokenError

class JWT:
    def __init__(self) -> None:
        self.jwtSecret = settings.jwt_secret
        self.algorithm = "HS256"
        self.tokenExpireMinutes = 60 * 24 # token lasts 1 day
        
    def createToken(self, userId: UUID):
        expire = dt.datetime.now() + dt.timedelta(minutes=self.tokenExpireMinutes)
        
        toEncode = {
            "userId": str(userId),
            "exp": expire
        }
        dataEncoded = jwt.encode(claims=toEncode, key=self.jwtSecret, algorithm=self.algorithm)
        
        return dataEncoded
        
    def decode(self, token: str):
        
        try:
            payload = jwt.decode(token=token, key=self.jwtSecret, algorithms=self.algorithm)
        except ExpiredSignatureError:
            raise expiredTokenError()
        except Exception as e:
            raise invalidAuthorizatinoTokenError()
        
        return payload
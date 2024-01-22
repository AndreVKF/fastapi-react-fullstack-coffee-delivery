import datetime as dt

from fastapi import Header
from typing import Annotated

from src.services.jwt import JWT
from src.errors.invalid_authorization_token_error import invalidAuthorizatinoTokenError

async def get_user_id_from_token(authorization: Annotated[str, Header()]):
    if not bool(authorization):
        invalidAuthorizatinoTokenError()
        
    token = authorization.split(sep=" ")[1]
        
    _jwt = JWT()
    decodedToken = _jwt.decode(token=token)
    userId = decodedToken["userId"]
    
    return userId

from fastapi import HTTPException, status

def invalidAuthorizatinoTokenError():
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
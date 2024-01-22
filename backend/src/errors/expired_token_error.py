from fastapi import HTTPException, status

def expiredTokenError():
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
from fastapi import HTTPException, status

def authenticationError():
    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
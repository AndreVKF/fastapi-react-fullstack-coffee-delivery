from fastapi import HTTPException, status

def resourceNotFoundError():
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Resource not found")
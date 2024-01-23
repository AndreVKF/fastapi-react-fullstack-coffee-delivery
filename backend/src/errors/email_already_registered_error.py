from fastapi import HTTPException, status

def emailAlreadyRegisteredError():
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email fornecido já está cadastrado")
from uuid import UUID
from pydantic import BaseModel, EmailStr

class AuthRequest(BaseModel):
    email: EmailStr
    password: str
    
class AuthResponse(BaseModel):
    userId: UUID
    token: str
    token_type: str
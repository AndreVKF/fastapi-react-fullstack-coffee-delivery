from pydantic import BaseModel, EmailStr

from uuid import UUID

class BaseUser(BaseModel):
    username: str
    email: EmailStr
    
class UserRequest(BaseUser):
    password: str
    
class UserResponse(BaseUser):
    id: UUID
    
class User(BaseUser):
    id: UUID
    password: str
    
    class Config:
        orm_mode = True
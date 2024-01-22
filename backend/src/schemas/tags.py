from uuid import UUID

from pydantic import BaseModel

class Tag(BaseModel):
    id: UUID
    tag: str
    
    class Config:
        orm_mode = True
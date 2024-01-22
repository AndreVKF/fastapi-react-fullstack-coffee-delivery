from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel
from uuid import UUID

from src.schemas.tags import Tag

class ProductPurchasePrice(BaseModel):
    price: float

class Product(BaseModel):
    id: UUID
    name: str
    description: str
    image_url: str
    price: float
    created_at: datetime
    updated_at: Optional[datetime] = None
    tags: List[Tag]
    
    class Config:
        orm_mode = True
        
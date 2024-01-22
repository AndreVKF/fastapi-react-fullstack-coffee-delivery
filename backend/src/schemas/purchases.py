from typing import List
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

from src.schemas.purchase_products import PurchaseProductResponseBase

class Purchase(BaseModel):
    
    id: UUID
    user_id: UUID
    purchase_date: datetime
    delivery_address: str
    payment_type: str
    
    class Config:
        orm_mode = True
        
class PurchaseResponseId(BaseModel):
    id: UUID
    
class PurchaseResponse(Purchase):
    id: UUID
    user_id: UUID
    purchase_date: datetime
    delivery_address: str
    payment_type: str
    
    products_purchase: List[PurchaseProductResponseBase]
from pydantic import BaseModel
from uuid import UUID
from typing import List


class PurchaseProductBase(BaseModel):
    product_id: UUID
    quantity: int

class PurchaseProductsCreateRequest(BaseModel):
    user_id: UUID
    delivery_address: str
    payment_type: str
    products: List[PurchaseProductBase]

class PurchaseProduct(PurchaseProductBase):
    purchase_id: UUID
    
    class Config:
        orm_mode = True
        
class PurchaseProductResponseBase(PurchaseProductBase):
    price: float
    image_url: str
    name: str
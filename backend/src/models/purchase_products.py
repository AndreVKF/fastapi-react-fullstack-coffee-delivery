from sqlalchemy import Column, ForeignKey, Integer
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType

from src.infra.database import Base

class PurchaseProducts(Base):
    __tablename__ = "purchase_products"
    
    purchase_id = Column(UUIDType, ForeignKey("purchases.id"), primary_key=True)
    product_id = Column(UUIDType, ForeignKey("products.id"), primary_key=True)
    quantity = Column(Integer, nullable=False)
        
    product = relationship("Products", lazy="subquery")
    purchase = relationship("Purchases", lazy="subquery")
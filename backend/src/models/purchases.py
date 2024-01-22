from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy_utils import UUIDType
from uuid import uuid4

from src.infra.database import Base

class Purchases(Base):
    __tablename__ = "purchases"
    
    id = Column(UUIDType, primary_key=True, default=uuid4)
    user_id = Column(UUIDType, ForeignKey("users.id"))
    purchase_date = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    delivery_address = Column(String, nullable=True)
    payment_type = Column(String, nullable=True)
    
    user = relationship("Users", lazy="subquery")
    purchase_products = relationship("PurchaseProducts", lazy="subquery", back_populates="purchase")
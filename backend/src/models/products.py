from sqlalchemy import Column, String, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType
from sqlalchemy.sql import func
from uuid import uuid4

from src.infra.database import Base
from src.models.product_tags import productTags

class Products(Base):
    __tablename__ = "products"
    
    id = Column(UUIDType, primary_key=True, default=uuid4)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    created_at = Column(DateTime, server_default=func.now(), nullable=False)
    updated_at = Column(DateTime, onupdate=func.now())
    
    tags = relationship("Tags", lazy="subquery", secondary=productTags, back_populates="products")
    

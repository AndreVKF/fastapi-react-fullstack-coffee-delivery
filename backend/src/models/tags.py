from uuid import uuid4
from sqlalchemy import Column, String
from sqlalchemy_utils import UUIDType
from sqlalchemy.orm import relationship

from src.models.product_tags import productTags
from src.infra.database import Base

class Tags(Base):
    
    __tablename__ = "tags"
    
    id = Column(UUIDType, primary_key=True, default=uuid4)
    tag = Column(String, nullable=False, unique=True)
    
    products = relationship("Products", secondary=productTags, back_populates="tags")
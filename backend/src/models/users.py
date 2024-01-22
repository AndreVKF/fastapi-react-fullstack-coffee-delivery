from sqlalchemy import Column, String
from sqlalchemy.orm import relationship
from sqlalchemy_utils import EmailType, UUIDType
from uuid import uuid4

from src.infra.database import Base


class Users(Base):
    __tablename__ = "users"
    
    id = Column(UUIDType, primary_key=True, default=uuid4)
    email = Column(EmailType, unique=True, index=True, nullable=False)
    username = Column(String)
    password = Column(String)
    
    purchases = relationship("Purchases", lazy="subquery", back_populates="user")
from uuid import UUID
from pydantic import EmailStr
from abc import ABC, abstractmethod

from src.models.users import Users

class UserRepository(ABC):
    
    @abstractmethod
    def createUser(self, user: Users):
        pass
    
    @abstractmethod
    def getUserById(self, userId: UUID):
        pass
    
    @abstractmethod
    def getUserByEmail(self, email: EmailStr):
        pass
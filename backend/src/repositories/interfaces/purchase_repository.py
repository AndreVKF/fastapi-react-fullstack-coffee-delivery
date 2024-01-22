from uuid import UUID
from abc import ABC, abstractmethod

class PurchaseRepository(ABC):
    
    @abstractmethod
    def createPurchase(self):
        pass
    
    @abstractmethod
    def fetchPurchaseById(self, purchaseId: UUID):
        pass
    
    @abstractmethod
    def fetchPurchasesByUserId(self, userId: UUID):
        pass
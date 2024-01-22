from abc import ABC, abstractmethod
from uuid import UUID

class ProductRepository(ABC):
    
    @abstractmethod
    def getProducts(self):
        pass
    
    @abstractmethod
    def fetchProductsByIdList(self):
        pass
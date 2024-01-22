from uuid import UUID

from src.repositories.interfaces.purchase_repository import PurchaseRepository

class GetUserPurchases:
    def __init__(self, PurchaseRepository: PurchaseRepository) -> None:
        self.PurchaseRepository = PurchaseRepository
        pass
    
    
    def execute(self, userId: UUID):
        userPurchases = self.PurchaseRepository().fetchPurchasesByUserId(userId=userId)
        
        return userPurchases
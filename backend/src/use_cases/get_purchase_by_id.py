from uuid import UUID

from src.repositories.interfaces.purchase_repository import PurchaseRepository
from src.schemas.purchase_products import PurchaseProductResponseBase

class GetPurchaseById:
    def __init__(self, PurchaseRepository: PurchaseRepository) -> None:
        self.PurchaseRepository = PurchaseRepository
        pass
    
    def execute(self, purchaseId: UUID) -> PurchaseProductResponseBase:
        purchase = self.PurchaseRepository().fetchPurchaseById(purchaseId=purchaseId)
        
        return purchase
        
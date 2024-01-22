from uuid import UUID, uuid4
from typing import List
from sqlalchemy.orm import Session

from src.errors.resource_not_found_error import resourceNotFoundError

from src.repositories.interfaces.purchase_repository import PurchaseRepository
from src.infra.database import engine
from src.dto.purchaseDbToPurchaseResponse import purchaseDbToPurchaseResponse

from src.schemas.purchases import PurchaseResponse
from src.schemas.purchase_products import PurchaseProductBase, PurchaseProductResponseBase

from src.models.purchases import Purchases
from src.models.purchase_products import PurchaseProducts

class SqlPurchaseRepository(PurchaseRepository):
    
    def createPurchase(
        self,
        userId: UUID,
        deliveryAddress: str,
        paymentType: str,
        productsPurchaseList: List[PurchaseProductBase]
        ):
        
        with Session(bind=engine) as session:
            try:
                # create purchase
                newPurchase = Purchases(
                    id = uuid4(),
                    delivery_address = deliveryAddress,
                    payment_type = paymentType,
                    user_id = userId
                    )
                session.add(newPurchase)
                
                # add products to purchase products
                for productPurchased in productsPurchaseList:
                    purchaseProduct = PurchaseProducts(
                        purchase_id=newPurchase.id,
                        product_id=productPurchased.product_id,
                        quantity=productPurchased.quantity
                        )
                    session.add(purchaseProduct)
                    
                session.commit()
                session.refresh(newPurchase)
            
            except Exception as e:
                print(e)
                session.rollback()
                
        return newPurchase
        
    def fetchPurchaseById(self, purchaseId: UUID) -> PurchaseResponse:
        
        with Session(bind=engine) as session:
            purchase = session.query(Purchases).where(Purchases.id == purchaseId).first()
        
        if purchase is None:
            resourceNotFoundError()
        
        purchaseResponse = purchaseDbToPurchaseResponse(purchase=purchase)
        
        return purchaseResponse
    
    def fetchPurchasesByUserId(self, userId: UUID):
        
        with Session(bind=engine) as session:
            purchases = session.query(Purchases).where(Purchases.user_id == userId).order_by(Purchases.purchase_date.desc()).all()
            
        purchasesResponse = [purchaseDbToPurchaseResponse(purchase) for purchase in purchases]
        
        return purchasesResponse
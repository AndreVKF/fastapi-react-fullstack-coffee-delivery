from typing import List
from uuid import UUID

from src.schemas.products import Product
from src.schemas.purchase_products import PurchaseProductBase, PurchaseProduct
from src.errors.resource_not_found_error import resourceNotFoundError

from src.repositories.interfaces.product_repository import ProductRepository
from src.repositories.interfaces.user_repository import UserRepository
from src.repositories.interfaces.purchase_repository import PurchaseRepository

from src.use_cases.get_products_by_id import GetProductsById
from src.use_cases.get_user_by_id import GetUserById

class CreatePurchase:
    def __init__(
        self,
        ProductRepository: ProductRepository,
        UserRepository: UserRepository,
        PurchaseRepository: PurchaseRepository
        ) -> None:
        self.UserRepository = UserRepository
        self.ProductRepository = ProductRepository
        self.PurchaseRepository = PurchaseRepository
        pass
    
    def execute(
        self,
        userId: UUID,
        deliveryAddress: str,
        paymentType: str,
        products: List[PurchaseProductBase]
        ):
        productIds = [product.product_id for product in products]
        productsDb = GetProductsById(ProductRepository=self.ProductRepository).execute(productIds=productIds)
        
        if len(productIds) != len(productsDb):
            resourceNotFoundError()
        
        userDb = GetUserById(UserRepository=self.UserRepository).execute(userId=userId)
        if not userDb:
            resourceNotFoundError()
        
        # create list of purchase products
        purchase = self.PurchaseRepository().createPurchase(
            userId=userDb.id,
            deliveryAddress=deliveryAddress,
            paymentType=paymentType,
            productsPurchaseList=products
            )
        
        return purchase
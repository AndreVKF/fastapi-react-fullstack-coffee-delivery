from uuid import UUID

from src.repositories.interfaces.product_repository import ProductRepository
from src.schemas.products import Product

class GetProductsById:
    def __init__(self, ProductRepository: ProductRepository ) -> None:
        self.ProductRepository = ProductRepository
        pass
    
    def execute(self, productIds: list[UUID]) -> list[Product]:
        products = self.ProductRepository().fetchProductsByIdList(productIds=productIds)
        
        return products
from typing import List
from src.repositories.interfaces.product_repository import ProductRepository
from src.schemas.products import Product

class GetProducts:
    def __init__(self, ProductRepository: ProductRepository) -> None:
        self.ProductRepository = ProductRepository
        pass
    
    def execute(self) -> List[Product]:
        products = self.ProductRepository().getProducts()
        
        return products
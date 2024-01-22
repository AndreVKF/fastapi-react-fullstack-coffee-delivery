from uuid import UUID
from src.models.products import Products
from src.infra.database import engine, Session
from src.repositories.interfaces.product_repository import ProductRepository

class SqlProductRepository(ProductRepository):
    
    def __init__(self) -> None:
        super().__init__()
        self.engine = engine
        
    def getProducts(self):
        with Session(bind=self.engine) as session:
            products = session.query(Products).all()
        
        return products
    
    def fetchProductsByIdList(self, productIds: list[UUID]):
        with Session(bind=self.engine) as session:
            products = session.query(Products).where(Products.id.in_(productIds)).all()
        
        return products
        
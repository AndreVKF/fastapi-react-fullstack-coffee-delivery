from fastapi import APIRouter, Depends
from typing import List

from src.security.authenticate import get_user_id_from_token
from src.schemas.products import Product
from src.use_cases.get_products import GetProducts
from src.repositories.sql.sql_product_repository import SqlProductRepository

router = APIRouter(
    prefix="/products",
    tags=["products"],
    dependencies=[Depends(get_user_id_from_token)]
)

@router.get("/", response_model=list[Product])
def show():
    _GetProducts = GetProducts(ProductRepository=SqlProductRepository)
    products = _GetProducts.execute()
    
    return products
from fastapi import APIRouter, Depends

from uuid import UUID

from src.security.authenticate import get_user_id_from_token

from src.schemas.purchase_products import PurchaseProductsCreateRequest
from src.schemas.purchases import PurchaseResponseId, PurchaseResponse

from src.use_cases.create_purchase import CreatePurchase
from src.use_cases.get_purchase_by_id import GetPurchaseById

from src.repositories.sql.sql_product_repository import SqlProductRepository
from src.repositories.sql.sql_user_repository import SqlUserRepository
from src.repositories.sql.sql_purchase_repository import SqlPurchaseRepository

router = APIRouter(
    prefix="/purchases",
    tags=["purchases"],
    dependencies=[Depends(get_user_id_from_token)]
)

@router.post("/", response_model=PurchaseResponseId)
def create(body: PurchaseProductsCreateRequest):
    userId = body.user_id
    products = body.products
    deliveryAddress = body.delivery_address
    paymentType = body.payment_type
    
    purchase = CreatePurchase(
        ProductRepository=SqlProductRepository,
        UserRepository=SqlUserRepository,
        PurchaseRepository=SqlPurchaseRepository
        ).execute(
            userId=userId,
            products=products,
            deliveryAddress=deliveryAddress,
            paymentType=paymentType
            )
    
    return purchase

@router.get("/{purchase_id}", response_model=PurchaseResponse)
def index(purchase_id: UUID):
    purchase = GetPurchaseById(PurchaseRepository=SqlPurchaseRepository).execute(purchaseId=purchase_id)
    
    return purchase
    
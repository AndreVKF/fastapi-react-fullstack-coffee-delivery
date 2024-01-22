from uuid import UUID
from fastapi import APIRouter, Depends

from src.security.authenticate import get_user_id_from_token
from src.use_cases.get_user_purchases import GetUserPurchases
from src.repositories.sql.sql_purchase_repository import SqlPurchaseRepository

router = APIRouter(
    prefix="/user_purchases",
    tags=["user_purchases"],
    dependencies=[Depends(get_user_id_from_token)]
)

@router.get("/{user_id}")
def show(user_id: UUID):
    userPurchases = GetUserPurchases(PurchaseRepository=SqlPurchaseRepository).execute(userId=user_id)
    
    return userPurchases
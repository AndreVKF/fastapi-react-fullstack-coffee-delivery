from fastapi import APIRouter, Path, Depends
from typing import Annotated
from uuid import UUID

from src.schemas.users import UserRequest, UserResponse
from src.repositories.sql.sql_user_repository import SqlUserRepository
from src.security.authenticate import get_user_id_from_token
from src.use_cases.create_user import CreateUser
from src.use_cases.get_user_by_id import GetUserById
from src.errors.authentication_error import authenticationError
from src.errors.resource_not_found_error import resourceNotFoundError

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

@router.get("/{userId}", response_model=UserResponse)
def index(userId: Annotated[UUID, Path()], authUserId: Annotated[str, Depends(get_user_id_from_token)]):
    
    if str(userId) != str(authUserId):
        authenticationError()
    
    _GetUserById = GetUserById(UserRepository=SqlUserRepository)
    user = _GetUserById.execute(userId=userId)
    
    if user is None:
        resourceNotFoundError() 
    
    return user

@router.post("/", response_model=UserResponse)
def create(user: UserRequest):
    _CreateUser = CreateUser(UserRepository=SqlUserRepository)
    dbUser = _CreateUser.execute(user=user)
    
    return dbUser
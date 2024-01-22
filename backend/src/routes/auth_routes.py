from fastapi import APIRouter

from src.schemas.auth import AuthRequest, AuthResponse
from src.repositories.sql.sql_user_repository import SqlUserRepository
from src.use_cases.create_token import CreateToken
from src.use_cases.refresh_token import RefreshToken


router = APIRouter(
    prefix="/auth",
    tags=["authentication"]
)

@router.post("/", response_model=AuthResponse)
def create(authBody: AuthRequest):
    email = authBody.email
    password = authBody.password
    
    authResponse = CreateToken(UserRepository=SqlUserRepository).execute(email=email, password=password)
    
    return authResponse

@router.get("/{token}", response_model=AuthResponse)
def refresh(token: str):
    
    authResponse = RefreshToken().execute(token=token)
    
    return authResponse
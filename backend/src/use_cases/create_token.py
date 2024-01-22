from pydantic import EmailStr

from src.errors.authentication_error import authenticationError
from src.use_cases.get_user_by_email import GetUserByEmail
from src.services.hash import Hash
from src.services.jwt import JWT
from src.schemas.auth import AuthResponse

class CreateToken:
    def __init__(self, UserRepository) -> None:
        self.UserRepository = UserRepository
        pass
    
    def execute(self, email: EmailStr, password: str) -> AuthResponse:
    
        _GetUserByEmail = GetUserByEmail(UserRepository=self.UserRepository)
        user = _GetUserByEmail.execute(email=email)

        if user is None:
            authenticationError()
        
        _Hash = Hash()
        doesPasswordMatches = _Hash.compare(plainText=password, hashedText=user.password)
        
        if not bool(doesPasswordMatches):
            authenticationError()

        _jwt = JWT()
        token = _jwt.createToken(userId=user.id)
        
        return AuthResponse(token=token, userId=user.id, token_type="Bearer")
        
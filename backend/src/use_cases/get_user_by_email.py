from src.repositories.interfaces.user_repository import UserRepository
from src.models.users import Users

class GetUserByEmail:
    def __init__(self, UserRepository: UserRepository) -> None:
        self.UserRepository = UserRepository
        pass
    
    def execute(self, email: str) -> Users:
        user = self.UserRepository().getUserByEmail(email=email)
        
        return user
from uuid import UUID

from src.repositories.interfaces.user_repository import UserRepository
from src.models.users import Users

class GetUserById:
    def __init__(self, UserRepository: UserRepository) -> None:
        self.UserRepository = UserRepository
        pass
    
    def execute(self, userId: UUID) -> Users:
        user = self.UserRepository().getUserById(userId=userId)
        
        return user
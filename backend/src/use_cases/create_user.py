from src.models.users import Users
from src.services.hash import Hash
from src.repositories.interfaces.user_repository import UserRepository

class CreateUser:
    
    def __init__(self, UserRepository: UserRepository) -> None:
        self.UserRepository = UserRepository
        pass
    
    def execute(self, user: Users) -> Users:
        _hash = Hash()
        user.password = _hash.hash(plainText=user.password)
        newUser = self.UserRepository().createUser(user=user)
        
        return newUser
from src.models.users import Users
from src.services.hash import Hash
from src.repositories.interfaces.user_repository import UserRepository
from src.errors.email_already_registered_error import emailAlreadyRegisteredError

class CreateUser:
    
    def __init__(self, UserRepository: UserRepository) -> None:
        self.UserRepository = UserRepository
        pass
    
    def execute(self, user: Users) -> Users:
        _hash = Hash()
        
        # check if user already exists
        isUserOnDatabase = self.UserRepository().getUserByEmail(email=user.email)
        
        if bool(isUserOnDatabase):
            emailAlreadyRegisteredError()
        
        user.password = _hash.hash(plainText=user.password)
        newUser = self.UserRepository().createUser(user=user)
        
        return newUser
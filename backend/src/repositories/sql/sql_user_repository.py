from uuid import UUID
from pydantic import EmailStr

from src.infra.database import engine, Session
from src.models.users import Users
from src.repositories.interfaces.user_repository import UserRepository
from src.errors.resource_not_found_error import resourceNotFoundError
from src.errors.authentication_error import authenticationError

class SqlUserRepository(UserRepository):
    
    def __init__(self) -> None:
        super().__init__()
        self.engine = engine
    
    def getUserById(self, userId: UUID):
        with Session(bind=self.engine) as session:
            user = session.query(Users).filter(Users.id == userId).first()
        
        return user
    
    def getUserByEmail(self, email: EmailStr):
        with Session(bind=self.engine) as session:
            user = session.query(Users).filter(Users.email == email).first()
        
        return user
    
    def createUser(self, user: Users):
        
        with Session(bind=self.engine) as session:
            newUser = Users(**user.dict())
            session.add(newUser)
            session.commit()
            session.refresh(newUser)
        
        return newUser
    
from passlib.context import CryptContext

class Hash:
    def __init__(self) -> None:
        self.hashContext = CryptContext(schemes=["bcrypt"], deprecated="auto")
        
    def hash(self, plainText: str) -> str:
        return self.hashContext.hash(plainText)
    
    def compare(self, plainText: str, hashedText: str) -> str:
        return self.hashContext.verify(plainText, hashedText)
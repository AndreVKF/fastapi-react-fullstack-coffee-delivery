from fastapi import HTTPException, status

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

from src.configs.settings import settings

engine = create_engine(
    url=settings.database_url, echo=False, connect_args={'check_same_thread': False}
)

Base = declarative_base()

def create_db_and_tables():
    # Base.metadata.drop_all(bind=engine, tables=[
    #     Base.metadata.tables["product_tags"],
    #     Base.metadata.tables["products"],
    #     Base.metadata.tables["tags"],
    #     ])
    Base.metadata.create_all(bind=engine)
    
    
def get_session():
    with Session(bind=engine) as session:
        try:
            yield session
        except:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to connect to database")


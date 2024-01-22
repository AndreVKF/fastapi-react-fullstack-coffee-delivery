from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.infra.database import create_db_and_tables
from src.routes import (
    users_routes,
    auth_routes,
    products_routes,
    purchase_routes,
    user_purchases_routes
    )

from src.infra.populate_db import populateDb
from src.infra.database import engine

# force db check
from src.models import (
    product_tags,
    products,
    tags,
    users,
    purchase_products,
    purchases
    )

app = FastAPI()

@app.on_event("startup")
def init_db():
    create_db_and_tables()
    populateDb(engine=engine)
    

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(users_routes.router)
app.include_router(auth_routes.router)
app.include_router(products_routes.router)
app.include_router(purchase_routes.router)
app.include_router(user_purchases_routes.router)

@app.get("/")
async def read_root():
    return {"message": "Hello world!"}
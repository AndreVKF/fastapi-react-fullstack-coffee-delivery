from sqlalchemy import inspect
from sqlalchemy.orm import Session

from src.models.tags import Tags
from src.models.products import Products

INSERT_TAGS = ['TRADICIONAL', 'GELADO', 'COM LEITE', 'ESPECIAL', 'ALCOÓLICO']
INSERT_PRODUCTS = [
    {
        "image_url": 'expresso',
        "name": 'Expresso Tradicional',
        "description": 'O tradicional café feito com água quente e grãos moídos',
        "tags": ['TRADICIONAL'],
        "price": 9.9,
    },
    {
        "image_url": 'americano',
        "name": 'Expresso Americano',
        "description": 'Expresso diluído, menos intenso que o tradicional',
        "tags": ['TRADICIONAL'],
        "price": 9.9,
    },
    {
        "image_url": 'expressoCremoso',
        "name": 'Expresso Cremoso',
        "description": 'Café expresso tradicional com espuma cremosa',
        "tags": ['TRADICIONAL'],
        "price": 9.9,
    },
    {
        "image_url": 'cafeGelado',
        "name": 'Expresso Gelado',
        "description": 'Bebida preparada com café expresso e cubos de gelo',
        "tags": ['TRADICIONAL', 'GELADO'],
        "price": 9.9,
    },
    {
        "image_url": 'cafeComLeite',
        "name": 'Café com Leite',
        "description": 'Meio a meio de expresso tradicional com leite vaporizado',
        "tags": ['TRADICIONAL', 'COM LEITE'],
        "price": 9.9,
    },
    {
        "image_url": 'latte',
        "name": 'Latte',
        "description":
        'Uma dose de café expresso com o dobro de leite e espuma cremosa',
        "tags": ['TRADICIONAL', 'COM LEITE'],
        "price": 9.9,
    },
    {
        "image_url": 'capuccino',
        "name": 'Capuccino',
        "description":
        'Bebida com canela feita de doses iguais de café, leite e espuma',
        "tags": ['TRADICIONAL', 'COM LEITE'],
        "price": 9.9,
    },
    {
        "image_url": 'macchiato',
        "name": 'Macchiato',
        "description":
        'Café expresso misturado com um pouco de leite quente e espuma',
        "tags": ['TRADICIONAL', 'COM LEITE'],
        "price": 9.9,
    },
    {
        "image_url": 'mochaccino',
        "name": 'Mocaccino',
        "description": 'Café expresso com calda de chocolate, pouco leite e espuma',
        "tags": ['TRADICIONAL', 'COM LEITE'],
        "price": 9.9,
    },
    {
        "image_url": 'chocolateQuente',
        "name": 'Chocolate Quente',
        "description":
        'Bebida feita com chocolate dissolvido no leite quente e café',
        "tags": ['ESPECIAL', 'COM LEITE'],
        "price": 9.9,
    },
    {
        "image_url": 'cubano',
        "name": 'Cubano',
        "description":
        'Drink gelado de café expresso com rum, creme de leite e hortelã',
        "tags": ['ESPECIAL', 'ALCOÓLICO', 'GELADO'],
        "price": 9.9,
    },
    {
        "image_url": 'havaiano',
        "name": 'Havaiano',
        "description": 'Bebida adocicada preparada com café e leite de coco',
        "tags": ['ESPECIAL'],
        "price": 9.9,
    },
    {
        "image_url": 'arabe',
        "name": 'Árabe',
        "description": 'Bebida preparada com grãos de café árabe e especiarias',
        "tags": ['ESPECIAL'],
        "price": 9.9,
    },
    {
        "image_url": 'irlandes',
        "name": 'Irlandês',
        "description": 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
        "tags": ['ESPECIAL', 'ALCOÓLICO'],
        "price": 9.9,
    },
]


def insertTags(engine: Session):
    listOfTags = []
    
    with Session(engine) as session:
        for tag in INSERT_TAGS:
            tagDb = Tags(tag=tag)
            listOfTags.append(tagDb)
            
        try:
            session.add_all(listOfTags)
            session.commit()
        except:
            session.rollback()

def insertProducts(engine: Session):
    
    with Session(engine) as session:
        for product in INSERT_PRODUCTS:
            productDb = Products(
                name=product["name"],
                description=product["description"],
                image_url=product["image_url"],
                price=product["price"]
            )
            
            session.add(productDb)
            
            # getTags
            for tag in product["tags"]:
                tagDb = session.query(Tags).filter(Tags.tag == tag).first()
                productDb.tags.append(tagDb)
        try:
            session.commit()
        except:
            session.rollback()


def populateDb(engine: Session):
    
    # if tables already exists, don't need to populate
    hasTags = hasProducts = False
    with Session(engine) as session:
        hasTags = bool(session.query(Tags).first())
        hasProducts = bool(session.query(Products).first())
    
    if not hasTags:
        insertTags(engine=engine)
        
    if not hasProducts:
        insertProducts(engine=engine)
    
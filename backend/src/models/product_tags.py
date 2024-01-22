from sqlalchemy import Table, Column, ForeignKey

from src.infra.database import Base

productTags = Table(
    "product_tags",
    Base.metadata,
    Column('product_id', ForeignKey('products.id', ondelete="CASCADE"), primary_key=True),
    Column('tag_id', ForeignKey('tags.id', ondelete="CASCADE"), primary_key=True)
)
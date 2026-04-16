from sqlalchemy import Column, String, Float, Boolean
from app.models.base import BaseModel

class User(BaseModel):
    __tablename__ = "users"
    
    address = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String, nullable=True)
    balance = Column(Float, default=10000.0)
    api_key = Column(String, unique=True, index=True, nullable=True)
    tier = Column(String, default="basic")  # basic, pro
    is_active = Column(Boolean, default=True)

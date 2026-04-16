from sqlalchemy import Column, String, Float, Boolean, Text
from app.models.base import BaseModel

class Market(BaseModel):
    __tablename__ = "markets"
    
    polymarket_id = Column(String, unique=True, index=True)
    question = Column(Text, nullable=False)
    category = Column(String, index=True)
    yes_price = Column(Float)
    no_price = Column(Float)
    volume = Column(Float, default=0)
    liquidity = Column(Float, default=0)
    image_url = Column(String, nullable=True)
    end_date = Column(String, nullable=True)
    is_active = Column(Boolean, default=True, index=True)
    raw_data = Column(Text, nullable=True)  # JSON of full API response

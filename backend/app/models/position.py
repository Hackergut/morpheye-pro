from sqlalchemy import Column, String, Float, Integer, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Position(BaseModel):
    __tablename__ = "positions"
    
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    market_id = Column(String, index=True)
    market_question = Column(String)
    side = Column(String)  # "Yes" or "No"
    entry_price = Column(Float)
    current_price = Column(Float)
    size = Column(Float)
    pnl = Column(Float, default=0.0)
    is_open = Column(Boolean, default=True)
    
    user = relationship("User", backref="positions")

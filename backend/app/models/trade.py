from sqlalchemy import Column, String, Float, Integer, ForeignKey
from app.models.base import BaseModel

class Trade(BaseModel):
    __tablename__ = "trades"
    
    user_id = Column(Integer, ForeignKey("users.id"), index=True)
    market_id = Column(String, index=True)
    market_question = Column(String)
    side = Column(String)  # "Yes" or "No"
    entry_price = Column(Float)
    exit_price = Column(Float)
    size = Column(Float)
    pnl = Column(Float)
    trade_type = Column(String)  # "open" or "close"

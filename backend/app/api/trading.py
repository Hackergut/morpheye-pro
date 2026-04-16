from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.services.trading import trading_engine

router = APIRouter(prefix="/trade", tags=["trading"])

class OpenTradeRequest(BaseModel):
    user_address: str
    market_id: str
    market_question: str
    side: str
    price: float
    size: float

class CloseTradeRequest(BaseModel):
    position_id: int
    exit_price: float

@router.post("/open")
async def open_trade(req: OpenTradeRequest, db: AsyncSession = Depends(get_db)):
    """Open a new position"""
    try:
        user = await trading_engine.get_or_create_user(db, req.user_address)
        position = await trading_engine.open_position(
            db,
            user_id=user.id,
            market_id=req.market_id,
            market_question=req.market_question,
            side=req.side,
            price=req.price,
            size=req.size
        )
        return {"success": True, "position_id": position.id, "balance": user.balance}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/close")
async def close_trade(req: CloseTradeRequest, db: AsyncSession = Depends(get_db)):
    """Close a position"""
    result = await trading_engine.close_position(db, req.position_id, req.exit_price)
    return {"success": True, **result}

@router.get("/positions/{user_address}")
async def get_positions(user_address: str, db: AsyncSession = Depends(get_db)):
    """Get user positions"""
    user = await trading_engine.get_or_create_user(db, user_address)
    return {"positions": user.positions, "balance": user.balance}

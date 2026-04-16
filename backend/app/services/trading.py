from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from app.models.position import Position
from app.models.trade import Trade
import uuid

class TradingEngine:
    @staticmethod
    async def get_or_create_user(db: AsyncSession, address: str) -> User:
        result = await db.execute(select(User).where(User.address == address))
        user = result.scalar_one_or_none()
        
        if not user:
            user = User(
                address=address,
                api_key=str(uuid.uuid4()),
                balance=10000.0
            )
            db.add(user)
            await db.commit()
            await db.refresh(user)
        
        return user
    
    @staticmethod
    async def open_position(
        db: AsyncSession,
        user_id: int,
        market_id: str,
        market_question: str,
        side: str,
        price: float,
        size: float
    ) -> Position:
        # Deduct balance
        user_result = await db.execute(select(User).where(User.id == user_id))
        user = user_result.scalar_one()
        
        if user.balance < size:
            raise ValueError("Insufficient balance")
        
        user.balance -= size
        
        position = Position(
            user_id=user_id,
            market_id=market_id,
            market_question=market_question,
            side=side,
            entry_price=price,
            current_price=price,
            size=size,
            is_open=True
        )
        
        db.add(position)
        await db.commit()
        await db.refresh(position)
        
        return position
    
    @staticmethod
    async def close_position(
        db: AsyncSession,
        position_id: int,
        exit_price: float
    ) -> dict:
        result = await db.execute(select(Position).where(Position.id == position_id))
        position = result.scalar_one()
        
        pnl = (exit_price - position.entry_price) * position.size * (1 if position.side == "Yes" else -1)
        
        # Update user balance
        user_result = await db.execute(select(User).where(User.id == position.user_id))
        user = user_result.scalar_one()
        user.balance += position.size + pnl
        
        # Move to trades
        trade = Trade(
            user_id=position.user_id,
            market_id=position.market_id,
            market_question=position.market_question,
            side=position.side,
            entry_price=position.entry_price,
            exit_price=exit_price,
            size=position.size,
            pnl=pnl,
            trade_type="close"
        )
        
        position.is_open = False
        
        db.add(trade)
        await db.commit()
        
        return {"pnl": pnl, "new_balance": user.balance}

trading_engine = TradingEngine()

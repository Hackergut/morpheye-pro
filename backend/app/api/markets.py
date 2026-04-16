from fastapi import APIRouter, Depends
from typing import List
from app.services.polymarket import polymarket_client

router = APIRouter(prefix="/markets", tags=["markets"])

@router.get("/")
async def get_markets(limit: int = 30):
    """Get all markets from Polymarket"""
    markets = await polymarket_client.get_markets(limit)
    return {"markets": markets, "count": len(markets)}

@router.get("/{market_id}")
async def get_market(market_id: str):
    """Get single market (mock for now)"""
    markets = await polymarket_client.get_markets(1)
    return markets[0] if markets else {}

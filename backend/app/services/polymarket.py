import httpx
import json
from typing import List, Optional
from app.core.config import get_settings
import asyncio

settings = get_settings()

class PolymarketClient:
    def __init__(self):
        self.base_url = settings.POLYMARKET_API_URL
        self.cache = {}  # Simple in-memory cache
    
    async def get_markets(self, limit: int = 30) -> List[dict]:
        """Fetch markets from Polymarket"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}?limit={limit}&active=true",
                    timeout=10.0
                )
                if not response.ok:
                    raise Exception(f"API error: {response.status_code}")
                
                data = response.json()
                return self._parse_markets(data)
        except Exception as e:
            print(f"Polymarket API error: {e}")
            return self._get_mock_markets()
    
    def _parse_markets(self, data: List[dict]) -> List[dict]:
        markets = []
        for m in data[:30]:
            try:
                outcome_prices = json.loads(m.get('outcomePrices', '[]'))
                yes_price = (outcome_prices[0] if len(outcome_prices) > 0 else 0.5) * 100
                no_price = (outcome_prices[1] if len(outcome_prices) > 1 else 0.5) * 100
                
                markets.append({
                    "id": m.get('id'),
                    "question": m.get('question', 'Unknown'),
                    "category": (m.get('tags') or ['General'])[0],
                    "yes_price": round(yes_price, 1),
                    "no_price": round(no_price, 1),
                    "volume": m.get('volume24hr') or m.get('volume', 0),
                    "liquidity": m.get('liquidity', 0),
                    "image": m.get('image'),
                    "end_date": m.get('endDate'),
                    "active": m.get('active', True)
                })
            except Exception as e:
                continue
        return markets
    
    def _get_mock_markets(self) -> List[dict]:
        return [
            {"id": "1", "question": "BTC above $100K?", "category": "Crypto", "yes_price": 42, "no_price": 58, "volume": 3800000, "liquidity": 2100000},
            {"id": "2", "question": "Trump tariffs announced?", "category": "Politics", "yes_price": 67, "no_price": 33, "volume": 1240000, "liquidity": 890000},
            {"id": "3", "question": "Fed cuts rates?", "category": "Finance", "yes_price": 28, "no_price": 72, "volume": 2150000, "liquidity": 1540000}
        ]

polymarket_client = PolymarketClient()

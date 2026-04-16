from pydantic_settings import BaseSettings
from typing import Optional
from functools import lru_cache

class Settings(BaseSettings):
    # App
    APP_NAME: str = "Morpheye Platform"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False
    
    # API
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://morpheye:password@localhost/morpheye"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Security
    SECRET_KEY: str = "super-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Polymarket
    POLYMARKET_API_URL: str = "https://gamma-api.polymarket.com/markets"
    POLYMARKET_WS_URL: str = "wss://api-polymarket-com_PUSH.webfdwqrdb.com/ws"
    
    # Demo
    DEMO_BALANCE: float = 10000.0
    
    class Config:
        env_file = ".env"
        case_sensitive = True

@lru_cache
def get_settings() -> Settings:
    return Settings()

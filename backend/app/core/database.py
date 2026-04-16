from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import get_settings
import os

settings = get_settings()

# SQLite fix
db_url = settings.DATABASE_URL
if db_url.startswith("sqlite"):
    # SQLite needs same thread
    engine = create_async_engine(db_url, echo=settings.DEBUG, connect_args={"check_same_thread": False})
else:
    engine = create_async_engine(db_url, echo=settings.DEBUG, pool_pre_ping=True)

AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

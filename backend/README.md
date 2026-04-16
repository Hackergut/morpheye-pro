# Morpheye Professional Platform

AI-Powered Prediction Market Terminal with Polymarket Integration.

## Quick Start

```bash
# Install dependencies
pip install -r requirements.txt

# Run
python -m app.main
```

## API Docs

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Endpoints

- `GET /` - Root
- `GET /health` - Health check
- `GET /api/v1/markets` - Live markets
- `POST /api/v1/trade/open` - Open position
- `POST /api/v1/trade/close` - Close position
- `GET /api/v1/trade/positions/{address}` - Get positions

## Architecture

- **FastAPI** - Async Python web framework
- **SQLAlchemy** - ORM with async support
- **Pydantic** - Settings and validation
- **JWT** - Authentication
- **SQLite/PostgreSQL** - Database

## Deployment

Ready for Coolify deployment with Dockerfile included.

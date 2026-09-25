from fastapi import APIRouter

from app.api.routes import bills


api_router = APIRouter()

api_router.include_router(
    bills.router,
)
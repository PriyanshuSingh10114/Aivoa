from fastapi import APIRouter
from app.api.routers import interaction, chat

api_router = APIRouter()
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(interaction.router, prefix="/interaction", tags=["interaction"])

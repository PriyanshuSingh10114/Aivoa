from fastapi import APIRouter
from app.api.routers import interaction, chat, complaints

api_router = APIRouter()
api_router.include_router(complaints.router, prefix="/complaints", tags=["complaints"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(interaction.router, prefix="/interaction", tags=["interaction"])

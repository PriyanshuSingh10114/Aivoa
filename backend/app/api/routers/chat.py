from fastapi import APIRouter
from typing import Any
from app.schemas.interaction import ChatRequest, ChatResponse

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat_interaction(request: ChatRequest) -> Any:
    # TODO: Connect to LangGraph Agent
    # The LangGraph agent will process the natural language,
    # decide whether to extract info, search, edit, or recommend.
    
    # Mock response
    return {
        "summary_generated": True,
        "doctor": "Dr. Mock Sharma",
        "hospital": "Mock Hospital",
        "products": ["Mock Product"],
        "sentiment": "Positive",
        "action_items": ["Send Mock Brochure"],
        "follow_up": "Next Tuesday",
        "needs_confirmation": True,
        "ai_message": "I have extracted the details. Would you like me to save this interaction?"
    }

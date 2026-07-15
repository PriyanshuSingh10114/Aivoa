from fastapi import APIRouter, Depends, HTTPException
from typing import Any
from app.schemas.interaction import ChatRequest, ChatResponse
from app.services.agent_service import AgentService, get_agent_service

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat_interaction(
    request: ChatRequest,
    agent_service: AgentService = Depends(get_agent_service)
) -> Any:
    """
    Process a chat message from the user and return extracted CRM entities.
    """
    try:
        response = await agent_service.process_chat(
            message=request.message,
            current_state=request.current_state
        )
        return response
    except Exception as e:
        # In a real app, you might want more specific exception handling here
        raise HTTPException(status_code=500, detail=str(e))

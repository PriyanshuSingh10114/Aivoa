from fastapi import APIRouter
from typing import Any
from app.schemas.interaction import ChatRequest, ChatResponse
from app.graph.graph import crm_agent
from langchain_core.messages import HumanMessage

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def chat_interaction(request: ChatRequest) -> Any:
    # Initialize state
    initial_state = {
        "messages": [HumanMessage(content=request.message)],
        "current_intent": None,
        "extracted_entities": {},
        "selected_tool": None,
        "tool_output": None,
        "memory_context": "",
        "final_response": None,
        "needs_confirmation": True
    }
    
    # Invoke Graph
    result_state = await crm_agent.ainvoke(initial_state)
    
    # Map back to response
    entities = result_state.get("extracted_entities", {})
    return {
        "summary_generated": True,
        "doctor": entities.get("doctor"),
        "hospital": entities.get("hospital"),
        "products": entities.get("products", []),
        "sentiment": entities.get("sentiment"),
        "action_items": entities.get("action_items", []),
        "follow_up": entities.get("follow_up"),
        "needs_confirmation": result_state.get("needs_confirmation", True),
        "ai_message": result_state.get("final_response", "Processed successfully.")
    }

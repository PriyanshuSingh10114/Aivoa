from fastapi import APIRouter, Depends, HTTPException
from typing import Any, List
from app.schemas.interaction import InteractionCreate, InteractionUpdate, InteractionResponse

router = APIRouter()

@router.post("/", response_model=InteractionResponse)
async def log_interaction(interaction: InteractionCreate) -> Any:
    # TODO: This will eventually route to LangGraph tool for processing
    # For now, it's a placeholder returning mock data
    return {
        "id": 1,
        **interaction.model_dump(),
        "sentiment": "Positive",
        "action_items": ["Send brochure"],
        "visit_title": f"Visit with {interaction.doctor_name}"
    }

@router.put("/{id}", response_model=InteractionResponse)
async def update_interaction(id: int, interaction: InteractionUpdate) -> Any:
    # TODO: Connect to DB and update
    pass

@router.delete("/{id}")
async def delete_interaction(id: int) -> Any:
    # TODO: Connect to DB and delete
    pass

@router.get("/{id}", response_model=InteractionResponse)
async def get_interaction(id: int) -> Any:
    # TODO: Connect to DB and fetch
    pass

@router.get("/history/{hcp}", response_model=List[InteractionResponse])
async def get_interaction_history(hcp: str) -> Any:
    # TODO: Connect to DB and fetch history for HCP
    return []

@router.get("/insights/{hcp}")
async def get_insights(hcp: str) -> Any:
    # TODO: Trigger Interaction Insights Tool
    return {"insights": "Mock insights"}

from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date

class InteractionBase(BaseModel):
    doctor_name: str
    hospital: str
    speciality: Optional[str] = None
    interaction_type: str = Field(default="In-Person")
    visit_date: date
    duration: int = Field(description="Duration in minutes")
    products_discussed: List[str] = []
    competitor_products: List[str] = []
    discussion_notes: Optional[str] = None
    doctor_feedback: Optional[str] = None
    objections: List[str] = []
    commitments: List[str] = []
    next_follow_up_date: Optional[date] = None

class InteractionCreate(InteractionBase):
    pass

class InteractionUpdate(InteractionBase):
    doctor_name: Optional[str] = None
    hospital: Optional[str] = None
    visit_date: Optional[date] = None
    duration: Optional[int] = None

class InteractionResponse(InteractionBase):
    id: int
    sentiment: Optional[str] = None
    action_items: List[str] = []
    visit_title: Optional[str] = None
    
    class Config:
        from_attributes = True

class ChatRequest(BaseModel):
    message: str
    doctor_name: Optional[str] = None

class ChatResponse(BaseModel):
    summary_generated: bool
    doctor: Optional[str] = None
    hospital: Optional[str] = None
    products: List[str] = []
    sentiment: Optional[str] = None
    action_items: List[str] = []
    follow_up: Optional[str] = None
    needs_confirmation: bool = True
    ai_message: str

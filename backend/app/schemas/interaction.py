from pydantic import BaseModel, Field
from typing import List, Optional, Literal, Dict, Any
from datetime import date

class InteractionBase(BaseModel):
    doctor_name: str
    hospital: str
    speciality: Optional[str] = None
    interaction_type: str = Field(default="Meeting")
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
    id: str
    sentiment: Optional[str] = None
    action_items: List[str] = []
    visit_title: Optional[str] = None
    
    class Config:
        from_attributes = True

# --- NEW SIMPLIFIED CRM SCHEMA ---

class HCPSchema(BaseModel):
    doctor_name: Optional[str] = None
    hospital: Optional[str] = None
    speciality: Optional[str] = None

class InteractionDetailsSchema(BaseModel):
    type: Optional[str] = None
    date: Optional[str] = None
    duration: Optional[str] = None

class ProductsSchema(BaseModel):
    primary: Optional[str] = None
    secondary: List[str] = []
    competitors: List[str] = []

class DiscussionSchema(BaseModel):
    summary: Optional[str] = None
    doctor_feedback: Optional[str] = None
    objections: List[str] = []

class MaterialsSchema(BaseModel):
    shared: List[str] = []
    samples_distributed: Optional[bool] = None
    sample_quantity: Optional[int] = None

class OutcomeSchema(BaseModel):
    sentiment: Optional[str] = None
    prescription_intent: Optional[str] = None

class FollowUpSchema(BaseModel):
    date: Optional[str] = None
    notes: Optional[str] = None

class AIRecommendationSchema(BaseModel):
    next_best_action: Optional[str] = None
    confidence: Optional[str] = None

class StructuredData(BaseModel):
    hcp: Optional[HCPSchema] = Field(default_factory=HCPSchema)
    interaction: Optional[InteractionDetailsSchema] = Field(default_factory=InteractionDetailsSchema)
    products: Optional[ProductsSchema] = Field(default_factory=ProductsSchema)
    discussion: Optional[DiscussionSchema] = Field(default_factory=DiscussionSchema)
    materials: Optional[MaterialsSchema] = Field(default_factory=MaterialsSchema)
    outcome: Optional[OutcomeSchema] = Field(default_factory=OutcomeSchema)
    follow_up: Optional[FollowUpSchema] = Field(default_factory=FollowUpSchema)
    ai_recommendation: Optional[AIRecommendationSchema] = Field(default_factory=AIRecommendationSchema)

class ChatRequest(BaseModel):
    message: str
    doctor_name: Optional[str] = None
    current_state: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    reply: str
    structured_data: StructuredData
    confidence: Dict[str, Any] = {}
    status: str = "success"
    needs_confirmation: bool = True

class ConversationMessageSchema(BaseModel):
    sender: str
    text: str
    timestamp: Optional[str] = None

class SaveInteractionRequest(BaseModel):
    data: StructuredData
    conversation: List[ConversationMessageSchema] = []
    interaction_id: Optional[str] = None

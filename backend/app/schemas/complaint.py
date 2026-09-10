from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import date, datetime

class ComplaintOriginSchema(BaseModel):
    complaint_source: Optional[str] = Field(default=None, description="Source of complaint: Direct Customer, Hospital, Distributor, Pharmacy, Regulatory Agency")
    customer_name: Optional[str] = Field(default=None, description="Name of the customer, pharmacy, or institution")
    customer_contact: Optional[str] = Field(default=None, description="Contact email/phone if provided")

class ComplaintProductSchema(BaseModel):
    product_name: Optional[str] = Field(default=None, description="Name of the drug product / active pharmaceutical ingredient")
    product_strength: Optional[str] = Field(default=None, description="Strength / Dosage form / Grade, e.g. 500mg, 10mg/mL")
    batch_number: Optional[str] = Field(default=None, description="Batch / Lot Number")
    manufacturing_date: Optional[str] = Field(default=None, description="Manufacturing Date (YYYY-MM-DD or MM/YYYY)")
    expiry_date: Optional[str] = Field(default=None, description="Expiry Date (YYYY-MM-DD or MM/YYYY)")
    quantity_affected: Optional[str] = Field(default=None, description="Quantity or units affected, e.g. 10 vials, 5 boxes")

class ComplaintDetailsSchema(BaseModel):
    complaint_type: Optional[str] = Field(default=None, description="Complaint type: Packaging Defect, Physical Contamination, Color/Discoloration, Potency/Subpotency, Labeling, Dissolution, Adverse Event, Broken Seal")
    complaint_date: Optional[str] = Field(default=None, description="Date the complaint was reported")
    description: Optional[str] = Field(default=None, description="Detailed narrative description of the complaint defect")

class ComplaintAssessmentSchema(BaseModel):
    severity: Optional[str] = Field(default="Major", description="Initial Severity: Critical, Major, Minor")
    priority: Optional[str] = Field(default="P2 - High", description="Priority: P1 - Urgent, P2 - High, P3 - Normal")

class StructuredComplaintData(BaseModel):
    origin: ComplaintOriginSchema = Field(default_factory=ComplaintOriginSchema)
    product: ComplaintProductSchema = Field(default_factory=ComplaintProductSchema)
    details: ComplaintDetailsSchema = Field(default_factory=ComplaintDetailsSchema)
    assessment: ComplaintAssessmentSchema = Field(default_factory=ComplaintAssessmentSchema)

class CompletenessResult(BaseModel):
    is_complete: bool = False
    missing_fields: List[str] = Field(default_factory=list)
    completeness_score: int = Field(default=0, ge=0, le=100)

class ClassificationResult(BaseModel):
    category: str = "Unclassified"
    subcategory: Optional[str] = None
    defect_type: Optional[str] = None

class RiskAssessmentResult(BaseModel):
    risk_level: str = "Medium" # Critical, High, Medium, Low
    risk_score: int = Field(default=50, ge=0, le=100)
    patient_impact: str = "Potential" # Definite, Potential, Negligible, None
    quality_impact: str = "Medium" # High, Medium, Low
    investigation_required: bool = True
    recall_evaluation_required: bool = False
    reasoning: List[str] = Field(default_factory=list)

class RecommendationsResult(BaseModel):
    potential_root_causes: List[str] = Field(default_factory=list)
    corrective_actions: List[str] = Field(default_factory=list)
    preventive_actions: List[str] = Field(default_factory=list)

class DuplicateMatch(BaseModel):
    complaint_id: str
    product_name: Optional[str] = None
    batch_number: Optional[str] = None
    similarity_score: int = 0
    matched_reason: str = ""

class ComplaintAnalysisResponse(BaseModel):
    extracted_data: StructuredComplaintData
    completeness: CompletenessResult
    classification: ClassificationResult
    risk_assessment: RiskAssessmentResult
    recommendations: RecommendationsResult
    summary: str
    confidence: Dict[str, str] = Field(default_factory=dict)
    duplicate_matches: List[DuplicateMatch] = Field(default_factory=list)
    status: str = "success"
    message: str = "Complaint analyzed successfully."

class AnalyzeTextRequest(BaseModel):
    text: str
    current_state: Optional[Dict[str, Any]] = None

class CopilotChatRequest(BaseModel):
    message: str
    complaint_data: Optional[Dict[str, Any]] = None
    history: List[Dict[str, str]] = Field(default_factory=list)

class CopilotChatResponse(BaseModel):
    reply: str
    status: str = "success"

class SaveComplaintRequest(BaseModel):
    data: StructuredComplaintData
    ai_assessment: Optional[Dict[str, Any]] = None
    document_name: Optional[str] = None
    raw_text: Optional[str] = None
    conversation: List[Dict[str, Any]] = Field(default_factory=list)
    complaint_id: Optional[str] = None

class SaveComplaintResponse(BaseModel):
    status: str
    message: str
    complaint_id: str
    tracking_number: str

class ComplaintListItem(BaseModel):
    id: str
    tracking_number: str
    customer_name: Optional[str] = None
    product_name: Optional[str] = None
    batch_number: Optional[str] = None
    complaint_type: Optional[str] = None
    severity: Optional[str] = None
    priority: Optional[str] = None
    status: str = "Pending Triage"
    created_at: datetime

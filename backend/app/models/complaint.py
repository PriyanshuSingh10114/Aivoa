import uuid
from sqlalchemy import (
    Column, String, Integer, ForeignKey, Date, DateTime, Text, Boolean
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.db.base_class import Base

class Complaint(Base):
    __tablename__ = "complaints"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    tracking_number = Column(String, unique=True, index=True, nullable=False)
    
    # Section 1: Origin & Customer Details
    complaint_source = Column(String, index=True) # Direct Customer, Hospital, Distributor, Pharmacy, Regulatory Agency
    customer_name = Column(String, index=True)
    customer_contact = Column(String)
    
    # Section 2: Product & Batch Identification
    product_name = Column(String, index=True)
    product_strength = Column(String)
    batch_number = Column(String, index=True)
    manufacturing_date = Column(Date, nullable=True)
    expiry_date = Column(Date, nullable=True)
    quantity_affected = Column(String)
    
    # Section 3: Complaint Details
    complaint_type = Column(String, index=True) # Packaging Defect, Physical Contamination, etc.
    complaint_date = Column(Date, nullable=True)
    description = Column(Text)
    
    # Section 4: Initial Assessment & Priority
    severity = Column(String, default="Major") # Critical, Major, Minor
    priority = Column(String, default="P2 - High") # P1 - Urgent, P2 - High, P3 - Normal
    status = Column(String, default="Pending Triage", index=True) # Pending Triage, Under Investigation, Closed
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    assessment = relationship("AIAssessment", back_populates="complaint", uselist=False, cascade="all, delete-orphan")
    documents = relationship("ComplaintDocument", back_populates="complaint", cascade="all, delete-orphan")
    conversations = relationship("ComplaintConversation", back_populates="complaint", cascade="all, delete-orphan")


class AIAssessment(Base):
    __tablename__ = "ai_assessments"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    complaint_id = Column(UUID(as_uuid=True), ForeignKey("complaints.id", ondelete="CASCADE"), unique=True, index=True)
    
    risk_level = Column(String) # Critical, High, Medium, Low
    risk_score = Column(Integer) # 0-100
    patient_impact = Column(String)
    quality_impact = Column(String)
    investigation_required = Column(Boolean, default=True)
    recall_evaluation_required = Column(Boolean, default=False)
    
    category = Column(String)
    defect_type = Column(String)
    
    completeness_score = Column(Integer)
    is_complete = Column(Boolean, default=False)
    missing_fields = Column(JSONB) # list of field names
    reasoning = Column(JSONB) # list of strings
    
    potential_root_causes = Column(JSONB) # list of potential root causes for QA review
    corrective_actions = Column(JSONB) # list of corrective action considerations
    preventive_actions = Column(JSONB) # list of preventive action considerations
    executive_summary = Column(Text)
    
    model_used = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    complaint = relationship("Complaint", back_populates="assessment")


class ComplaintDocument(Base):
    __tablename__ = "complaint_documents"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    complaint_id = Column(UUID(as_uuid=True), ForeignKey("complaints.id", ondelete="CASCADE"), index=True)
    
    file_name = Column(String, nullable=False)
    file_type = Column(String)
    file_size = Column(Integer)
    extracted_text = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    complaint = relationship("Complaint", back_populates="documents")


class ComplaintConversation(Base):
    __tablename__ = "complaint_conversations"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    complaint_id = Column(UUID(as_uuid=True), ForeignKey("complaints.id", ondelete="CASCADE"), index=True)
    
    role = Column(String) # user, assistant
    message = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    complaint = relationship("Complaint", back_populates="conversations")

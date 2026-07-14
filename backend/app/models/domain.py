import uuid
from sqlalchemy import (
    Column, String, Integer, ForeignKey, Date, DateTime, Text, Boolean, Table
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.dialects.postgresql import UUID, JSONB
from app.db.base_class import Base

class HCP(Base):
    __tablename__ = "hcp"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    hcp_code = Column(String, unique=True, index=True)
    full_name = Column(String, index=True, nullable=False)
    hospital_name = Column(String, index=True)
    speciality = Column(String, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    interactions = relationship("Interaction", back_populates="hcp")


class Product(Base):
    __tablename__ = "products"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    product_name = Column(String, index=True, nullable=False)
    status = Column(String, default="Active")


class Interaction(Base):
    __tablename__ = "interactions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    hcp_id = Column(UUID(as_uuid=True), ForeignKey("hcp.id", ondelete="CASCADE"), index=True)
    interaction_type = Column(String, index=True) # Normalized (e.g. Meeting)
    date = Column(Date, index=True, nullable=False)
    duration = Column(Integer)  # in minutes
    summary = Column(Text)
    doctor_feedback = Column(Text)
    objections = Column(JSONB) # Stored as array of strings
    competitor_mentions = Column(JSONB) # Stored as array of strings
    sentiment = Column(String) # Positive, Neutral, Negative
    prescription_intent = Column(String) # High, Medium, Low
    next_best_action = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    hcp = relationship("HCP", back_populates="interactions")
    
    # Sub-Tables
    interaction_products = relationship("InteractionProduct", back_populates="interaction", cascade="all, delete-orphan")
    materials_shared = relationship("MaterialShared", back_populates="interaction", cascade="all, delete-orphan")
    followups = relationship("FollowUp", back_populates="interaction", cascade="all, delete-orphan")
    ai_extraction = relationship("AIExtraction", back_populates="interaction", uselist=False, cascade="all, delete-orphan")
    conversation_history = relationship("ConversationHistory", back_populates="interaction", cascade="all, delete-orphan")


class InteractionProduct(Base):
    __tablename__ = "interaction_products"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    interaction_id = Column(UUID(as_uuid=True), ForeignKey("interactions.id", ondelete="CASCADE"), index=True)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id", ondelete="CASCADE"), index=True)
    discussion_type = Column(String) # "Primary" or "Secondary"
    
    interaction = relationship("Interaction", back_populates="interaction_products")
    product = relationship("Product")


class MaterialShared(Base):
    __tablename__ = "materials_shared"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    interaction_id = Column(UUID(as_uuid=True), ForeignKey("interactions.id", ondelete="CASCADE"), index=True)
    material_name = Column(String) # e.g. "Clinical Brochure"
    is_sample = Column(Boolean, default=False)
    quantity = Column(Integer, default=1)
    
    interaction = relationship("Interaction", back_populates="materials_shared")


class FollowUp(Base):
    __tablename__ = "followups"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    interaction_id = Column(UUID(as_uuid=True), ForeignKey("interactions.id", ondelete="CASCADE"), index=True)
    scheduled_date = Column(Date, index=True)
    notes = Column(Text)
    status = Column(String, default="Scheduled")
    
    interaction = relationship("Interaction", back_populates="followups")


class ConversationHistory(Base):
    __tablename__ = "conversation_history"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    interaction_id = Column(UUID(as_uuid=True), ForeignKey("interactions.id", ondelete="CASCADE"), index=True)
    role = Column(String) # user or assistant
    message = Column(Text)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    interaction = relationship("Interaction", back_populates="conversation_history")


class AIExtraction(Base):
    __tablename__ = "ai_extractions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    interaction_id = Column(UUID(as_uuid=True), ForeignKey("interactions.id", ondelete="CASCADE"), index=True, unique=True)
    structured_json = Column(JSONB)
    model_used = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    interaction = relationship("Interaction", back_populates="ai_extraction")

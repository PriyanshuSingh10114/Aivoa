from sqlalchemy import Column, Integer, String, ForeignKey, Date, DateTime, Text, Float, Boolean, Table
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base_class import Base

# Association table for interaction <-> products
interaction_products = Table(
    'interaction_products',
    Base.metadata,
    Column('interaction_id', Integer, ForeignKey('interaction.id', ondelete="CASCADE"), primary_key=True),
    Column('product_id', Integer, ForeignKey('product.id', ondelete="CASCADE"), primary_key=True)
)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="rep")
    
    interactions = relationship("Interaction", back_populates="user")
    activity_logs = relationship("ActivityLog", back_populates="user")

class HCP(Base):
    __tablename__ = "hcp"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    hospital = Column(String, nullable=False)
    speciality = Column(String)
    engagement_score = Column(Float, default=0.0)
    
    interactions = relationship("Interaction", back_populates="hcp")

class Product(Base):
    __tablename__ = "product"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    category = Column(String)
    description = Column(Text)

class Interaction(Base):
    __tablename__ = "interaction"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    hcp_id = Column(Integer, ForeignKey("hcp.id"))
    interaction_type = Column(String, default="In-Person")
    visit_date = Column(Date, nullable=False)
    duration = Column(Integer, default=15)
    discussion_notes = Column(Text)
    doctor_feedback = Column(Text)
    sentiment = Column(String)
    visit_title = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    user = relationship("User", back_populates="interactions")
    hcp = relationship("HCP", back_populates="interactions")
    products = relationship("Product", secondary=interaction_products)
    followups = relationship("Followup", back_populates="interaction", cascade="all, delete-orphan")

class Followup(Base):
    __tablename__ = "followup"
    id = Column(Integer, primary_key=True, index=True)
    interaction_id = Column(Integer, ForeignKey("interaction.id", ondelete="CASCADE"))
    due_date = Column(Date, nullable=False)
    task_description = Column(Text, nullable=False)
    status = Column(String, default="Pending")
    
    interaction = relationship("Interaction", back_populates="followups")

class ActivityLog(Base):
    __tablename__ = "activity_log"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    action = Column(String, nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User", back_populates="activity_logs")

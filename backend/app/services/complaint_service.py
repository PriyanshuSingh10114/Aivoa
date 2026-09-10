import uuid
import datetime
import logging
from typing import Dict, Any, List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from dateutil import parser as date_parser

from app.core.config import settings
from app.graph.graph import complaint_agent
from app.graph.nodes import copilot_chat_service
from app.models.complaint import Complaint, AIAssessment, ComplaintDocument, ComplaintConversation
from app.schemas.complaint import (
    ComplaintAnalysisResponse,
    StructuredComplaintData,
    CompletenessResult,
    ClassificationResult,
    RiskAssessmentResult,
    RecommendationsResult,
    DuplicateMatch,
    SaveComplaintRequest,
    SaveComplaintResponse
)

logger = logging.getLogger(__name__)

class ComplaintService:
    async def analyze_text(self, raw_text: str, document_name: Optional[str] = None, db: Optional[AsyncSession] = None) -> ComplaintAnalysisResponse:
        """
        Executes the LangGraph StateGraph pipeline on raw complaint text.
        """
        initial_state = {
            "raw_text": raw_text,
            "document_name": document_name,
            "extracted_data": {},
            "completeness": {},
            "classification": {},
            "risk_assessment": {},
            "recommendations": {},
            "summary": "",
            "confidence_scores": {},
            "duplicate_matches": [],
            "errors": []
        }
        
        # Invoke LangGraph
        result = await complaint_agent.ainvoke(initial_state)
        
        extracted = result.get("extracted_data", {})
        completeness = result.get("completeness", {})
        classification = result.get("classification", {})
        risk = result.get("risk_assessment", {})
        recommendations = result.get("recommendations", {})
        summary = result.get("summary", "Complaint analyzed.")
        confidence = result.get("confidence_scores", {})
        
        # Duplicate detection
        duplicates = []
        if db:
            duplicates = await self._check_duplicates(db, extracted)
            
        return ComplaintAnalysisResponse(
            extracted_data=StructuredComplaintData.model_validate(extracted),
            completeness=CompletenessResult.model_validate(completeness),
            classification=ClassificationResult.model_validate(classification),
            risk_assessment=RiskAssessmentResult.model_validate(risk),
            recommendations=RecommendationsResult.model_validate(recommendations),
            summary=summary,
            confidence=confidence,
            duplicate_matches=duplicates,
            status="success",
            message="Complaint extracted and analyzed successfully."
        )

    async def _check_duplicates(self, db: AsyncSession, extracted: Dict[str, Any]) -> List[DuplicateMatch]:
        """
        Checks existing complaints in the database for matching product name or batch number.
        """
        matches = []
        try:
            batch_no = extracted.get("product", {}).get("batch_number")
            product_name = extracted.get("product", {}).get("product_name")
            
            if batch_no:
                stmt = select(Complaint).where(Complaint.batch_number == batch_no).limit(3)
                res = await db.execute(stmt)
                records = res.scalars().all()
                for rec in records:
                    matches.append(DuplicateMatch(
                        complaint_id=str(rec.id),
                        product_name=rec.product_name,
                        batch_number=rec.batch_number,
                        similarity_score=95,
                        matched_reason=f"Exact match on Batch Number: {rec.batch_number} ({rec.tracking_number})"
                    ))
            elif product_name:
                stmt = select(Complaint).where(Complaint.product_name.ilike(f"%{product_name}%")).limit(2)
                res = await db.execute(stmt)
                records = res.scalars().all()
                for rec in records:
                    matches.append(DuplicateMatch(
                        complaint_id=str(rec.id),
                        product_name=rec.product_name,
                        batch_number=rec.batch_number,
                        similarity_score=70,
                        matched_reason=f"Similar Product Name match: {rec.product_name} ({rec.tracking_number})"
                    ))
        except Exception as e:
            logger.warning(f"Duplicate check error: {e}")
            
        return matches

    def _parse_date(self, val: Optional[str]) -> Optional[datetime.date]:
        if not val or str(val).lower() in ["null", "none", "n/a"]:
            return None
        try:
            return date_parser.parse(str(val)).date()
        except:
            return None

    async def save_complaint(self, db: AsyncSession, payload: SaveComplaintRequest) -> SaveComplaintResponse:
        """
        Persists complaint form data, AI assessment, document metadata, and conversation history to PostgreSQL.
        """
        data = payload.data
        ai_assessment_data = payload.ai_assessment or {}
        
        # Generate tracking number: CMP-YYYY-XXXX
        year = datetime.datetime.now().year
        random_suffix = uuid.uuid4().hex[:4].upper()
        tracking_number = f"CMP-{year}-{random_suffix}"
        
        mfd_date = self._parse_date(data.product.manufacturing_date)
        exp_date = self._parse_date(data.product.expiry_date)
        complaint_date = self._parse_date(data.details.complaint_date) or datetime.date.today()
        
        # Create Complaint
        complaint = Complaint(
            tracking_number=tracking_number,
            complaint_source=data.origin.complaint_source or "Direct Customer",
            customer_name=data.origin.customer_name or "Unknown Customer",
            customer_contact=data.origin.customer_contact,
            product_name=data.product.product_name or "Unspecified Product",
            product_strength=data.product.product_strength,
            batch_number=data.product.batch_number,
            manufacturing_date=mfd_date,
            expiry_date=exp_date,
            quantity_affected=data.product.quantity_affected,
            complaint_type=data.details.complaint_type or "Quality Defect",
            complaint_date=complaint_date,
            description=data.details.description,
            severity=data.assessment.severity or "Major",
            priority=data.assessment.priority or "P2 - High",
            status="Pending Triage"
        )
        db.add(complaint)
        await db.flush()
        
        # Create AI Assessment
        if ai_assessment_data:
            risk = ai_assessment_data.get("risk_assessment", {})
            recs = ai_assessment_data.get("recommendations", {})
            class_info = ai_assessment_data.get("classification", {})
            completeness = ai_assessment_data.get("completeness", {})
            
            assessment = AIAssessment(
                complaint_id=complaint.id,
                risk_level=risk.get("risk_level", "Medium"),
                risk_score=risk.get("risk_score", 50),
                patient_impact=risk.get("patient_impact", "Potential"),
                quality_impact=risk.get("quality_impact", "Medium"),
                investigation_required=risk.get("investigation_required", True),
                recall_evaluation_required=risk.get("recall_evaluation_required", False),
                category=class_info.get("category", "Quality Defect"),
                defect_type=class_info.get("defect_type", data.details.complaint_type),
                completeness_score=completeness.get("completeness_score", 0),
                is_complete=completeness.get("is_complete", False),
                missing_fields=completeness.get("missing_fields", []),
                reasoning=risk.get("reasoning", []),
                potential_root_causes=recs.get("potential_root_causes", []),
                corrective_actions=recs.get("corrective_actions", []),
                preventive_actions=recs.get("preventive_actions", []),
                executive_summary=ai_assessment_data.get("summary", ""),
                model_used="Groq (" + (settings.GROQ_MODEL or "gemma2-9b-it") + ")"
            )
            db.add(assessment)
            
        # Add Document if provided
        if payload.document_name and payload.raw_text:
            doc = ComplaintDocument(
                complaint_id=complaint.id,
                file_name=payload.document_name,
                file_type=payload.document_name.split(".")[-1].upper() if "." in payload.document_name else "TEXT",
                file_size=len(payload.raw_text.encode('utf-8')),
                extracted_text=payload.raw_text[:10000] # Store preview
            )
            db.add(doc)
            
        # Add Conversations
        for msg in payload.conversation:
            db.add(ComplaintConversation(
                complaint_id=complaint.id,
                role=msg.get("sender", msg.get("role", "user")),
                message=msg.get("text", msg.get("message", ""))
            ))
            
        await db.commit()
        await db.refresh(complaint)
        
        return SaveComplaintResponse(
            status="success",
            message="Customer complaint logged successfully.",
            complaint_id=str(complaint.id),
            tracking_number=tracking_number
        )

    async def get_complaints(self, db: AsyncSession, limit: int = 50) -> List[Dict[str, Any]]:
        stmt = select(Complaint).order_by(desc(Complaint.created_at)).limit(limit)
        res = await db.execute(stmt)
        records = res.scalars().all()
        return [
            {
                "id": str(r.id),
                "tracking_number": r.tracking_number,
                "customer_name": r.customer_name,
                "product_name": r.product_name,
                "batch_number": r.batch_number,
                "complaint_type": r.complaint_type,
                "severity": r.severity,
                "priority": r.priority,
                "status": r.status,
                "created_at": r.created_at.isoformat() if r.created_at else None
            }
            for r in records
        ]

    async def get_complaint_by_id(self, db: AsyncSession, complaint_id: str) -> Optional[Dict[str, Any]]:
        try:
            uid = uuid.UUID(complaint_id)
        except:
            return None
        stmt = select(Complaint).where(Complaint.id == uid)
        res = await db.execute(stmt)
        complaint = res.scalar_one_or_none()
        if not complaint:
            return None
            
        # Load assessment
        stmt_a = select(AIAssessment).where(AIAssessment.complaint_id == uid)
        res_a = await db.execute(stmt_a)
        assessment = res_a.scalar_one_or_none()
        
        return {
            "id": str(complaint.id),
            "tracking_number": complaint.tracking_number,
            "origin": {
                "complaint_source": complaint.complaint_source,
                "customer_name": complaint.customer_name,
                "customer_contact": complaint.customer_contact
            },
            "product": {
                "product_name": complaint.product_name,
                "product_strength": complaint.product_strength,
                "batch_number": complaint.batch_number,
                "manufacturing_date": complaint.manufacturing_date.isoformat() if complaint.manufacturing_date else None,
                "expiry_date": complaint.expiry_date.isoformat() if complaint.expiry_date else None,
                "quantity_affected": complaint.quantity_affected
            },
            "details": {
                "complaint_type": complaint.complaint_type,
                "complaint_date": complaint.complaint_date.isoformat() if complaint.complaint_date else None,
                "description": complaint.description
            },
            "assessment": {
                "severity": complaint.severity,
                "priority": complaint.priority
            },
            "status": complaint.status,
            "ai_assessment": {
                "risk_level": assessment.risk_level if assessment else "Medium",
                "risk_score": assessment.risk_score if assessment else 50,
                "patient_impact": assessment.patient_impact if assessment else "Potential",
                "quality_impact": assessment.quality_impact if assessment else "Medium",
                "investigation_required": assessment.investigation_required if assessment else True,
                "recall_evaluation_required": assessment.recall_evaluation_required if assessment else False,
                "reasoning": assessment.reasoning if assessment else [],
                "potential_root_causes": assessment.potential_root_causes if assessment else [],
                "corrective_actions": assessment.corrective_actions if assessment else [],
                "preventive_actions": assessment.preventive_actions if assessment else [],
                "executive_summary": assessment.executive_summary if assessment else "",
                "completeness_score": assessment.completeness_score if assessment else 0
            } if assessment else None,
            "created_at": complaint.created_at.isoformat() if complaint.created_at else None
        }

complaint_service = ComplaintService()

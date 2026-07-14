from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Any
import datetime
import uuid

from app.db.session import get_db
from app.schemas.interaction import StructuredData, SaveInteractionRequest
from app.models.domain import (
    HCP, Interaction, Product, InteractionProduct, 
    MaterialShared, FollowUp, AIExtraction, ConversationHistory
)

router = APIRouter()

@router.post("/", response_model=dict)
async def log_interaction(
    payload: SaveInteractionRequest, 
    db: AsyncSession = Depends(get_db)
) -> Any:
    try:
        interaction_data = payload.data
        chat_history = payload.conversation
        
        # 1. Upsert HCP
        doctor_name = interaction_data.hcp.doctor_name or "Unknown HCP"
        new_hcp = HCP(
            hcp_code=f"HCP-{uuid.uuid4().hex[:8]}",
            full_name=doctor_name,
            hospital_name=interaction_data.hcp.hospital,
            speciality=interaction_data.hcp.speciality
        )
        db.add(new_hcp)
        await db.flush()
        
        # 2. Parse Date
        visit_date = datetime.date.today()
        if interaction_data.interaction.date:
            try:
                from dateutil import parser
                visit_date = parser.parse(interaction_data.interaction.date).date()
            except:
                pass
                
        # Parse Duration
        duration_mins = 0
        if interaction_data.interaction.duration:
            try:
                duration_mins = int(''.join(filter(str.isdigit, str(interaction_data.interaction.duration))))
            except:
                pass

        # 3. Create Interaction
        new_interaction = Interaction(
            hcp_id=new_hcp.id,
            interaction_type=interaction_data.interaction.type or "Meeting",
            date=visit_date,
            duration=duration_mins,
            summary=interaction_data.discussion.summary,
            doctor_feedback=interaction_data.discussion.doctor_feedback,
            objections=interaction_data.discussion.objections if interaction_data.discussion.objections else [],
            competitor_mentions=interaction_data.products.competitors if interaction_data.products.competitors else [],
            sentiment=interaction_data.outcome.sentiment,
            prescription_intent=interaction_data.outcome.prescription_intent,
            next_best_action=interaction_data.ai_recommendation.next_best_action
        )
        db.add(new_interaction)
        await db.flush()
        
        # 4. Handle Products
        products_to_add = []
        if interaction_data.products.primary:
            products_to_add.append((interaction_data.products.primary, "Primary"))
        for sec_prod in interaction_data.products.secondary:
            if sec_prod:
                products_to_add.append((sec_prod, "Secondary"))
                
        for prod_name, p_type in products_to_add:
            new_prod = Product(product_name=prod_name)
            db.add(new_prod)
            await db.flush()
            
            ip = InteractionProduct(
                interaction_id=new_interaction.id,
                product_id=new_prod.id,
                discussion_type=p_type
            )
            db.add(ip)
            
        # 5. Handle Materials
        for mat in interaction_data.materials.shared:
            if mat:
                db.add(MaterialShared(
                    interaction_id=new_interaction.id,
                    material_name=mat,
                    is_sample=False
                ))
                
        if interaction_data.materials.samples_distributed:
            db.add(MaterialShared(
                interaction_id=new_interaction.id,
                material_name="Product Sample",
                is_sample=True,
                quantity=interaction_data.materials.sample_quantity or 1
            ))
            
        # 6. Handle FollowUp
        if interaction_data.follow_up.date or interaction_data.follow_up.notes:
            followup_date = None
            if interaction_data.follow_up.date:
                try:
                    from dateutil import parser
                    followup_date = parser.parse(interaction_data.follow_up.date).date()
                except:
                    pass
                    
            db.add(FollowUp(
                interaction_id=new_interaction.id,
                scheduled_date=followup_date,
                notes=interaction_data.follow_up.notes
            ))
            
        # 7. Insert Conversation History
        for msg in chat_history:
            db.add(ConversationHistory(
                interaction_id=new_interaction.id,
                role=msg.sender,
                message=msg.text
            ))
            
        # 8. Commit Transaction
        await db.commit()
        
        return {
            "status": "success",
            "message": "Interaction saved successfully",
            "interaction_id": str(new_interaction.id)
        }
        
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

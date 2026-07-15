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

from sqlalchemy import select, delete

@router.post("/", response_model=dict)
async def log_interaction(
    payload: SaveInteractionRequest, 
    db: AsyncSession = Depends(get_db)
) -> Any:
    try:
        interaction_data = payload.data
        chat_history = payload.conversation
        interaction_id = payload.interaction_id
        
        # Parse Date
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

        if interaction_id:
            # --- UPDATE EXISTING INTERACTION ---
            stmt = select(Interaction).where(Interaction.id == interaction_id)
            result = await db.execute(stmt)
            existing_interaction = result.scalar_one_or_none()
            
            if not existing_interaction:
                raise HTTPException(status_code=404, detail="Interaction not found for update")
                
            # Update HCP
            stmt_hcp = select(HCP).where(HCP.id == existing_interaction.hcp_id)
            result_hcp = await db.execute(stmt_hcp)
            existing_hcp = result_hcp.scalar_one()
            
            existing_hcp.full_name = interaction_data.hcp.doctor_name or "Unknown HCP"
            existing_hcp.hospital_name = interaction_data.hcp.hospital
            existing_hcp.speciality = interaction_data.hcp.speciality
            
            # Update Interaction
            existing_interaction.interaction_type = interaction_data.interaction.type or "Meeting"
            existing_interaction.date = visit_date
            existing_interaction.duration = duration_mins
            existing_interaction.summary = interaction_data.discussion.summary
            existing_interaction.doctor_feedback = interaction_data.discussion.doctor_feedback
            existing_interaction.objections = interaction_data.discussion.objections if interaction_data.discussion.objections else []
            existing_interaction.competitor_mentions = interaction_data.products.competitors if interaction_data.products.competitors else []
            existing_interaction.sentiment = interaction_data.outcome.sentiment
            existing_interaction.prescription_intent = interaction_data.outcome.prescription_intent
            existing_interaction.next_best_action = interaction_data.ai_recommendation.next_best_action
            existing_interaction.updated_at = datetime.datetime.utcnow()
            
            # Clear old relations
            await db.execute(delete(InteractionProduct).where(InteractionProduct.interaction_id == interaction_id))
            await db.execute(delete(MaterialShared).where(MaterialShared.interaction_id == interaction_id))
            await db.execute(delete(FollowUp).where(FollowUp.interaction_id == interaction_id))
            await db.execute(delete(ConversationHistory).where(ConversationHistory.interaction_id == interaction_id))
            
            target_interaction = existing_interaction
        else:
            # --- INSERT NEW INTERACTION ---
            doctor_name = interaction_data.hcp.doctor_name or "Unknown HCP"
            new_hcp = HCP(
                hcp_code=f"HCP-{uuid.uuid4().hex[:8]}",
                full_name=doctor_name,
                hospital_name=interaction_data.hcp.hospital,
                speciality=interaction_data.hcp.speciality
            )
            db.add(new_hcp)
            await db.flush()
            
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
            target_interaction = new_interaction
            
        # --- RE-INSERT RELATIONS (Shared for both INSERT and UPDATE) ---
        
        # Handle Products
        products_to_add = []
        if interaction_data.products.primary:
            products_to_add.append((interaction_data.products.primary, "Primary"))
        for sec_prod in interaction_data.products.secondary:
            if sec_prod:
                products_to_add.append((sec_prod, "Secondary"))
                
        for prod_name, p_type in products_to_add:
            # In a real app we'd look up the product by ID/Name, but here we just create it to satisfy FK
            new_prod = Product(product_name=prod_name)
            db.add(new_prod)
            await db.flush()
            
            ip = InteractionProduct(
                interaction_id=target_interaction.id,
                product_id=new_prod.id,
                discussion_type=p_type
            )
            db.add(ip)
            
        # Handle Materials
        for mat in interaction_data.materials.shared:
            if mat:
                db.add(MaterialShared(
                    interaction_id=target_interaction.id,
                    material_name=mat,
                    is_sample=False
                ))
                
        if interaction_data.materials.samples_distributed:
            db.add(MaterialShared(
                interaction_id=target_interaction.id,
                material_name="Product Sample",
                is_sample=True,
                quantity=interaction_data.materials.sample_quantity or 1
            ))
            
        # Handle FollowUp
        if interaction_data.follow_up.date or interaction_data.follow_up.notes:
            followup_date = None
            if interaction_data.follow_up.date:
                try:
                    from dateutil import parser
                    followup_date = parser.parse(interaction_data.follow_up.date).date()
                except:
                    pass
                    
            db.add(FollowUp(
                interaction_id=target_interaction.id,
                scheduled_date=followup_date,
                notes=interaction_data.follow_up.notes
            ))
            
        # Insert Conversation History
        for msg in chat_history:
            db.add(ConversationHistory(
                interaction_id=target_interaction.id,
                role=msg.sender,
                message=msg.text
            ))
            
        # Commit Transaction
        await db.commit()
        
        return {
            "status": "success",
            "message": "Interaction saved successfully",
            "interaction_id": str(target_interaction.id)
        }
        
    except Exception as e:
        await db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

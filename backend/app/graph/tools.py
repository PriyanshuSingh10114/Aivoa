import json
from typing import Dict, Any
from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import SessionLocal
from app.models.domain import Interaction, HCP, Product
from datetime import datetime

async def log_interaction_tool(entities: Dict[str, Any]) -> Dict[str, Any]:
    """Logs the interaction into the DB."""
    async with SessionLocal() as db:
        try:
            # 1. Ensure HCP exists
            hcp_name = entities.get("doctor_name", "Unknown Doctor")
            result = await db.execute(select(HCP).filter(HCP.name == hcp_name))
            hcp = result.scalars().first()
            if not hcp:
                hcp = HCP(name=hcp_name, hospital=entities.get("hospital", "Unknown"), speciality="General")
                db.add(hcp)
                await db.flush()

            # 2. Create Interaction
            interaction = Interaction(
                hcp_id=hcp.id,
                user_id=1, # Mock user id for now
                interaction_type="AI Logged",
                visit_date=datetime.utcnow().date(),
                discussion_notes=json.dumps(entities.get("action_items", [])),
                sentiment=entities.get("sentiment", "Neutral"),
                visit_title=f"Visit with {hcp.name}"
            )
            db.add(interaction)
            await db.commit()
            return {
                "status": "success",
                "message": f"Interaction with {hcp.name} successfully saved to database.",
                "data": entities
            }
        except Exception as e:
            await db.rollback()
            return {"status": "error", "message": str(e)}

async def edit_interaction_tool(entities: Dict[str, Any]) -> Dict[str, Any]:
    return {"status": "success", "message": "Interaction update planned."}

async def search_interaction_tool(query: str) -> Dict[str, Any]:
    async with SessionLocal() as db:
        result = await db.execute(select(Interaction).order_by(Interaction.visit_date.desc()).limit(5))
        interactions = result.scalars().all()
        return {
            "status": "success",
            "results": [
                {"date": str(i.visit_date), "title": i.visit_title} for i in interactions
            ]
        }

async def follow_up_recommendation_tool(doctor: str) -> Dict[str, Any]:
    return {
        "status": "success",
        "recommendation": f"Visit {doctor} next Tuesday to drop off brochure.",
        "priority": "High"
    }

async def interaction_insights_tool(doctor: str) -> Dict[str, Any]:
    return {
        "status": "success",
        "average_visit_frequency": "14 days",
        "most_discussed_product": "CardioX",
        "sentiment_trend": "Improving"
    }

async def execute_tool(tool_name: str, args: Dict[str, Any]) -> Dict[str, Any]:
    if tool_name == "log_interaction_tool":
        return await log_interaction_tool(args)
    elif tool_name == "edit_interaction_tool":
        return await edit_interaction_tool(args)
    elif tool_name == "search_interaction_tool":
        return await search_interaction_tool(args.get("doctor_name", "general"))
    elif tool_name == "follow_up_recommendation_tool":
        return await follow_up_recommendation_tool(args.get("doctor_name", "Unknown"))
    elif tool_name == "interaction_insights_tool":
        return await interaction_insights_tool(args.get("doctor_name", "Unknown"))
    else:
        return {"status": "error", "message": f"Tool {tool_name} not found"}

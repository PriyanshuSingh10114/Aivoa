from typing import Any, Dict
from app.graph.graph import crm_agent
from langchain_core.messages import HumanMessage
import logging

logger = logging.getLogger(__name__)

class AgentService:
    async def process_chat(self, message: str, session_id: str = "default_session") -> Dict[str, Any]:
        """
        Process a user message through the LangGraph AI Agent with Veeva CRM pipeline.
        """
        try:
            initial_state = {
                "messages": [HumanMessage(content=message)],
                "current_intent": None,
                "memory_context": "",
                "extracted_entities": {},
                "crm_mapped_data": {},
                "confidence_scores": {},
                "validation_status": {},
                "selected_tool": None,
                "tool_output": None,
                "final_response": None,
                "needs_confirmation": True
            }
            
            config = {"configurable": {"thread_id": session_id}}
            
            logger.info(f"Invoking Veeva CRM LangGraph for session {session_id}")
            result_state = await crm_agent.ainvoke(initial_state, config=config)
            
            entities = result_state.get("extracted_entities", {})
            confidence = result_state.get("confidence_scores", {})
            
            logger.info(f"Final extracted entities from state: {entities}")
            logger.info(f"Final confidence scores: {confidence}")
            
            return {
                "reply": result_state.get("final_response", "Veeva CRM update processed successfully."),
                "structured_data": entities,
                "confidence": confidence,
                "needs_confirmation": result_state.get("needs_confirmation", True),
                "status": "success"
            }
        except Exception as e:
            logger.error(f"Error processing chat message: {str(e)}", exc_info=True)
            raise

def get_agent_service() -> AgentService:
    return AgentService()

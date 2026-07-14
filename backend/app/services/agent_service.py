from typing import Any, Dict
from app.graph.graph import crm_agent
from langchain_core.messages import HumanMessage
import logging

logger = logging.getLogger(__name__)

class AgentService:
    async def process_chat(self, message: str, session_id: str = "default_session") -> Dict[str, Any]:
        """
        Process a user message through the LangGraph AI Agent with conversation memory.
        """
        try:
            initial_state = {
                "messages": [HumanMessage(content=message)],
                "current_intent": None,
                "extracted_entities": {},
                "selected_tool": None,
                "tool_output": None,
                "memory_context": "",
                "final_response": None,
                "needs_confirmation": True
            }
            
            config = {"configurable": {"thread_id": session_id}}
            
            # Invoke LangGraph
            result_state = await crm_agent.ainvoke(initial_state, config=config)
            
            # Extract and format response
            entities = result_state.get("extracted_entities", {})
            return {
                "summary_generated": True,
                "doctor": entities.get("doctor"),
                "hospital": entities.get("hospital"),
                "products": entities.get("products", []),
                "sentiment": entities.get("sentiment"),
                "action_items": entities.get("action_items", []),
                "follow_up": entities.get("follow_up"),
                "needs_confirmation": result_state.get("needs_confirmation", True),
                "ai_message": result_state.get("final_response", "Processed successfully.")
            }
        except Exception as e:
            logger.error(f"Error processing chat message: {str(e)}", exc_info=True)
            raise

def get_agent_service() -> AgentService:
    return AgentService()

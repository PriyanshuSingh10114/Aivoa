from typing import Annotated, TypedDict, List, Dict, Any, Optional
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages

class GraphState(TypedDict):
    """
    Represents the state of our AI-First CRM Agent.
    """
    # Using add_messages to append new messages to the existing list
    messages: Annotated[List[BaseMessage], add_messages]
    
    # Detected intent of the user (e.g., "log_interaction", "search_history", "edit_interaction")
    current_intent: Optional[str]
    
    # Structured data extracted from natural language
    extracted_entities: Dict[str, Any]
    
    # The name of the tool to execute
    selected_tool: Optional[str]
    
    # The output from the executed tool
    tool_output: Optional[Dict[str, Any]]
    
    # Contextual memory fetched from DB (e.g., past interactions)
    memory_context: str
    
    # A formatted response string to send back to the user
    final_response: Optional[str]
    
    # Flag to indicate if we need user confirmation before saving
    needs_confirmation: bool

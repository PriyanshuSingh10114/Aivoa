from typing import Annotated, TypedDict, List, Dict, Any, Optional
from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages

def merge_entities(old_entities: Dict[str, Any], new_entities: Dict[str, Any]) -> Dict[str, Any]:
    if not old_entities:
        return new_entities or {}
    
    merged = old_entities.copy()
    if not new_entities:
        return merged
        
    for k, v in new_entities.items():
        if v is not None:
            if isinstance(v, list) and len(v) == 0:
                continue
            if isinstance(v, str) and v == "":
                continue
            if isinstance(v, dict) and k in merged and isinstance(merged[k], dict):
                merged[k] = merge_entities(merged[k], v)
            else:
                merged[k] = v
    return merged

class GraphState(TypedDict):
    messages: Annotated[List[BaseMessage], add_messages]
    current_intent: Optional[str]
    memory_context: str
    extracted_entities: Annotated[Dict[str, Any], merge_entities]
    crm_mapped_data: Dict[str, Any]
    confidence_scores: Dict[str, Any]
    validation_status: Dict[str, Any]
    selected_tool: Optional[str]
    tool_output: Optional[Dict[str, Any]]
    final_response: Optional[str]
    needs_confirmation: bool


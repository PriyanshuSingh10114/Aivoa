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
            if isinstance(v, dict) and k in merged and isinstance(merged[k], dict):
                merged[k] = merge_entities(merged[k], v)
            else:
                merged[k] = v
    return merged

class ComplaintGraphState(TypedDict):
    raw_text: str
    document_name: Optional[str]
    current_state: Optional[Dict[str, Any]]
    extracted_data: Annotated[Dict[str, Any], merge_entities]
    completeness: Dict[str, Any]
    classification: Dict[str, Any]
    risk_assessment: Dict[str, Any]
    recommendations: Dict[str, Any]
    summary: str
    confidence_scores: Dict[str, Any]
    duplicate_matches: List[Dict[str, Any]]
    errors: List[str]
    final_response: Optional[str]

# Backwards compatible alias for graph runner
GraphState = ComplaintGraphState

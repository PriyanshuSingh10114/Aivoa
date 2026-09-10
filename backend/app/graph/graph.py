from langgraph.graph import StateGraph, END
from app.graph.state import ComplaintGraphState
from app.graph.nodes import (
    extract_complaint_node,
    check_completeness_node,
    assess_risk_and_capa_node
)

def build_complaint_graph() -> StateGraph:
    """
    Compiles the sequential Pharma Complaint QMS LangGraph workflow.
    """
    workflow = StateGraph(ComplaintGraphState)
    
    # 1. Add Nodes
    workflow.add_node("extract_complaint", extract_complaint_node)
    workflow.add_node("check_completeness", check_completeness_node)
    workflow.add_node("assess_risk_and_capa", assess_risk_and_capa_node)
    
    # 2. Add Flow Edges
    workflow.set_entry_point("extract_complaint")
    workflow.add_edge("extract_complaint", "check_completeness")
    workflow.add_edge("check_completeness", "assess_risk_and_capa")
    workflow.add_edge("assess_risk_and_capa", END)
    
    return workflow.compile()

complaint_agent = build_complaint_graph()
crm_agent = complaint_agent # backward compatibility alias

from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from app.graph.state import GraphState
from app.graph.nodes import (
    detect_intent,
    context_retrieval,
    entity_extraction,
    schema_validation,
    normalization,
    log_interaction,
    frontend_preview
)

def build_graph() -> StateGraph:
    # 1. Initialize Graph
    workflow = StateGraph(GraphState)
    
    # 2. Add Nodes
    workflow.add_node("intent_detection", detect_intent)
    workflow.add_node("context_retrieval", context_retrieval)
    workflow.add_node("entity_extraction", entity_extraction)
    workflow.add_node("schema_validation", schema_validation)
    workflow.add_node("normalization", normalization)
    workflow.add_node("log_interaction", log_interaction)
    workflow.add_node("frontend_preview", frontend_preview)
    
    # 3. Add Edges (Linear Simplified Flow)
    workflow.set_entry_point("intent_detection")
    workflow.add_edge("intent_detection", "context_retrieval")
    workflow.add_edge("context_retrieval", "entity_extraction")
    workflow.add_edge("entity_extraction", "schema_validation")
    workflow.add_edge("schema_validation", "normalization")
    workflow.add_edge("normalization", "log_interaction")
    workflow.add_edge("log_interaction", "frontend_preview")
    workflow.add_edge("frontend_preview", END)
    
    # Compile with Memory
    memory = MemorySaver()
    return workflow.compile(checkpointer=memory)

# Instantiate the agent
crm_agent = build_graph()

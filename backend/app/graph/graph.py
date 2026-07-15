from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from app.graph.state import GraphState
from app.graph.nodes import (
    detect_intent,
    context_retrieval,
    entity_extraction,
    edit_interaction_tool,
    save_interaction_node,
    clear_interaction_node,
    schema_validation,
    normalization,
    log_interaction,
    frontend_preview
)

def route_intent(state: GraphState):
    intent = state.get("current_intent")
    if intent == "edit_interaction":
        return "edit_interaction_tool"
    elif intent == "save_interaction":
        return "save_interaction_node"
    elif intent == "clear_interaction":
        return "clear_interaction_node"
    else:
        return "context_retrieval" # Default path for new_interaction

def build_graph() -> StateGraph:
    # 1. Initialize Graph
    workflow = StateGraph(GraphState)
    
    # 2. Add Nodes
    workflow.add_node("intent_detection", detect_intent)
    workflow.add_node("context_retrieval", context_retrieval)
    workflow.add_node("entity_extraction", entity_extraction)
    workflow.add_node("edit_interaction_tool", edit_interaction_tool)
    workflow.add_node("save_interaction_node", save_interaction_node)
    workflow.add_node("clear_interaction_node", clear_interaction_node)
    workflow.add_node("schema_validation", schema_validation)
    workflow.add_node("normalization", normalization)
    workflow.add_node("log_interaction", log_interaction)
    workflow.add_node("frontend_preview", frontend_preview)
    
    # 3. Add Edges (Conditional)
    workflow.set_entry_point("intent_detection")
    
    workflow.add_conditional_edges(
        "intent_detection",
        route_intent,
        {
            "context_retrieval": "context_retrieval",
            "edit_interaction_tool": "edit_interaction_tool",
            "save_interaction_node": "save_interaction_node",
            "clear_interaction_node": "clear_interaction_node"
        }
    )
    
    # Standard new interaction flow
    workflow.add_edge("context_retrieval", "entity_extraction")
    workflow.add_edge("entity_extraction", "schema_validation")
    
    # Edit flow
    workflow.add_edge("edit_interaction_tool", "schema_validation")
    
    # Shared validation & normalization
    workflow.add_edge("schema_validation", "normalization")
    workflow.add_edge("normalization", "log_interaction")
    workflow.add_edge("log_interaction", "frontend_preview")
    workflow.add_edge("frontend_preview", END)
    
    # End quickly for save/clear actions
    workflow.add_edge("save_interaction_node", END)
    workflow.add_edge("clear_interaction_node", END)
    
    # Compile with Memory
    memory = MemorySaver()
    return workflow.compile(checkpointer=memory)

# Instantiate the agent
crm_agent = build_graph()

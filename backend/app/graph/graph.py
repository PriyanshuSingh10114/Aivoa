from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from app.graph.state import GraphState
from app.graph.nodes import (
    detect_intent,
    extract_entities,
    retrieve_memory,
    select_tool,
    execute_selected_tool,
    validate_data,
    format_response
)

def build_graph() -> StateGraph:
    # 1. Initialize Graph
    workflow = StateGraph(GraphState)
    
    # 2. Add Nodes
    workflow.add_node("intent_detection", detect_intent)
    workflow.add_node("entity_extraction", extract_entities)
    workflow.add_node("memory_retrieval", retrieve_memory)
    workflow.add_node("tool_selection", select_tool)
    workflow.add_node("execute_tool", execute_selected_tool)
    workflow.add_node("validation", validate_data)
    workflow.add_node("response_formatter", format_response)
    
    # 3. Add Edges
    workflow.set_entry_point("intent_detection")
    workflow.add_edge("intent_detection", "entity_extraction")
    workflow.add_edge("entity_extraction", "memory_retrieval")
    workflow.add_edge("memory_retrieval", "tool_selection")
    workflow.add_edge("tool_selection", "execute_tool")
    workflow.add_edge("execute_tool", "validation")
    workflow.add_edge("validation", "response_formatter")
    workflow.add_edge("response_formatter", END)
    
    # Compile with Memory
    memory = MemorySaver()
    return workflow.compile(checkpointer=memory)

# Instantiate the agent
crm_agent = build_graph()

import json
from langchain_core.messages import HumanMessage
from langchain_groq import ChatGroq
from app.graph.state import GraphState
from app.graph.prompts import (
    INTENT_DETECTION_PROMPT, 
    ENTITY_EXTRACTION_PROMPT, 
    RESPONSE_FORMATTER_PROMPT,
    TOOL_SELECTION_PROMPT
)
from app.graph.tools import execute_tool
from app.core.config import settings

def get_llm():
    # If API key is not set, we'll return a mock LLM or handle it gracefully.
    # For a real run, this needs a valid GROQ_API_KEY.
    return ChatGroq(model_name="gemma2-9b-it", groq_api_key=settings.GROQ_API_KEY)

def detect_intent(state: GraphState) -> GraphState:
    llm = get_llm()
    messages = state.get("messages", [])
    if not messages:
        return state
    
    last_message = messages[-1].content
    chain = INTENT_DETECTION_PROMPT | llm
    try:
        response = chain.invoke({"message": last_message})
        intent = response.content.strip()
    except Exception as e:
        intent = "log_interaction" # fallback
    
    return {"current_intent": intent}

def extract_entities(state: GraphState) -> GraphState:
    llm = get_llm()
    messages = state.get("messages", [])
    last_message = messages[-1].content
    
    chain = ENTITY_EXTRACTION_PROMPT | llm
    try:
        response = chain.invoke({"message": last_message})
        # Basic JSON parsing from the string output
        # In a robust setup, use output parsers or OpenAI function calling style if supported
        raw_content = response.content.strip()
        # Find json block if fenced
        if "```json" in raw_content:
            raw_content = raw_content.split("```json")[1].split("```")[0].strip()
        entities = json.loads(raw_content)
    except Exception as e:
        entities = {"error": "Failed to parse entities", "raw": response.content if 'response' in locals() else str(e)}
        
    return {"extracted_entities": entities}

def retrieve_memory(state: GraphState) -> GraphState:
    # Mocking memory retrieval
    return {"memory_context": "Previous visit: Discussed competitor product."}

def select_tool(state: GraphState) -> GraphState:
    llm = get_llm()
    intent = state.get("current_intent", "log_interaction")
    chain = TOOL_SELECTION_PROMPT | llm
    try:
        response = chain.invoke({"intent": intent})
        tool_name = response.content.strip()
    except:
        tool_name = "log_interaction_tool"
    return {"selected_tool": tool_name}

async def execute_selected_tool(state: GraphState) -> GraphState:
    tool_name = state.get("selected_tool")
    entities = state.get("extracted_entities", {})
    output = await execute_tool(tool_name, entities)
    return {"tool_output": output}

def validate_data(state: GraphState) -> GraphState:
    # Dummy validation node
    needs_confirmation = True
    if state.get("current_intent") in ["search_interaction", "get_insights"]:
        needs_confirmation = False
    return {"needs_confirmation": needs_confirmation}

def format_response(state: GraphState) -> GraphState:
    llm = get_llm()
    entities = state.get("extracted_entities", {})
    tool_output = state.get("tool_output", {})
    chain = RESPONSE_FORMATTER_PROMPT | llm
    try:
        response = chain.invoke({
            "extracted_entities": json.dumps(entities),
            "tool_output": json.dumps(tool_output)
        })
        final_text = response.content
    except Exception as e:
        final_text = "Summary generated. Would you like me to save this interaction?"
        
    return {"final_response": final_text}

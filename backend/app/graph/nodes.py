import json
import re
from functools import lru_cache
from langchain_core.messages import HumanMessage
from langchain_groq import ChatGroq
from app.graph.state import GraphState
from app.graph.prompts import (
    INTENT_DETECTION_PROMPT, 
    ENTITY_EXTRACTION_PROMPT, 
    RESPONSE_FORMATTER_PROMPT
)
from app.core.config import settings
from app.schemas.interaction import StructuredData
from pydantic import BaseModel, Field, ValidationError
from typing import Optional, List, Dict, Any, Literal
import logging

logger = logging.getLogger(__name__)

@lru_cache(maxsize=1)
def get_llm():
    # Enforce JSON mode natively if the model supports it, otherwise standard generation
    return ChatGroq(model_name="llama-3.1-8b-instant", groq_api_key=settings.GROQ_API_KEY)

async def detect_intent(state: GraphState) -> GraphState:
    llm = get_llm()
    messages = state.get("messages", [])
    if not messages: return state
    last_message = messages[-1].content
    try:
        response = await (INTENT_DETECTION_PROMPT | llm).ainvoke({"message": last_message})
        intent = response.content.strip()
    except Exception as e:
        logger.error(f"Intent detection failed: {e}")
        intent = "log_interaction"
    return {"current_intent": intent}

async def context_retrieval(state: GraphState) -> GraphState:
    return {"memory_context": "Previous visit: Discussed competitor product."}

def extract_json_block(text: str) -> str:
    """Helper to strip markdown backticks if the LLM hallucinated them."""
    match = re.search(r"```(?:json)?(.*?)```", text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return text.strip()

# Relaxed Wrapper Schema for Validation
class RobustExtractionSchema(BaseModel):
    extracted_data: StructuredData = Field(default_factory=StructuredData)
    confidence_scores: Dict[str, Optional[str]] = Field(default_factory=dict)

async def entity_extraction(state: GraphState) -> GraphState:
    llm = get_llm()
    messages = state.get("messages", [])
    if not messages: return state
    last_message = messages[-1].content
    
    logger.info(f"--- EXTRACTION PIPELINE START ---")
    logger.info(f"Raw Prompt: {last_message}")
    
    # Notice we DO NOT use with_structured_output(). We call the LLM directly.
    chain = ENTITY_EXTRACTION_PROMPT | llm
    
    try:
        response = await chain.ainvoke({"message": last_message})
        raw_text = response.content
        logger.info(f"Raw LLM Output:\n{raw_text}")
        
        # 1. Clean Markdown
        clean_json = extract_json_block(raw_text)
        
        # 2. Parse JSON
        parsed_dict = json.loads(clean_json)
        
        # 3. Validate with Relaxed Pydantic Schema
        validated_data = RobustExtractionSchema.model_validate(parsed_dict)
        
        entities = validated_data.extracted_data.model_dump(exclude_unset=True)
        confidence = validated_data.confidence_scores
        
        logger.info(f"Successfully Validated Schema.")
        
    except json.JSONDecodeError as e:
        logger.error(f"JSON Parsing Failed: {e}")
        entities, confidence = {}, {}
    except ValidationError as e:
        logger.error(f"Pydantic Schema Mismatch: {e}")
        entities, confidence = {}, {}
    except Exception as e:
        logger.error(f"Unexpected Extraction Error: {e}")
        entities, confidence = {}, {}
        
    return {"extracted_entities": entities, "confidence_scores": confidence}

async def schema_validation(state: GraphState) -> GraphState:
    entities = state.get("extracted_entities", {})
    status = {"is_valid": True, "missing_fields": []}
    if not entities.get("hcp", {}).get("doctor_name"):
        status["is_valid"] = False
        status["missing_fields"].append("hcp.doctor_name")
    
    return {"validation_status": status, "needs_confirmation": not status["is_valid"]}

# --- NORMALIZATION UTILITIES ---

def normalize_sentiment(val: str) -> str:
    if not val: return None
    val = val.lower()
    if any(word in val for word in ["positive", "good", "great", "interested"]): return "Positive"
    if any(word in val for word in ["negative", "bad", "poor", "uninterested", "objection"]): return "Negative"
    return "Neutral"

def normalize_level(val: str) -> str:
    if not val: return None
    val = val.lower()
    if any(word in val for word in ["high", "very", "definitely", "strong"]): return "High"
    if any(word in val for word in ["low", "not", "never", "weak"]): return "Low"
    return "Medium"

def normalize_interaction_type(val: str) -> str:
    if not val: return "Meeting"
    val = val.lower()
    if "video" in val or "zoom" in val: return "Video Call"
    if "phone" in val or "call" in val: return "Phone Call"
    return "Meeting"

async def normalization(state: GraphState) -> GraphState:
    """
    Normalizes specific fields to strict enum values or standard terminology.
    """
    entities = state.get("extracted_entities", {}).copy()
    confidence = state.get("confidence_scores", {}).copy()
    
    logger.info("--- NORMALIZATION ENGINE ---")
    
    if "outcome" in entities:
        if entities["outcome"].get("sentiment"):
            entities["outcome"]["sentiment"] = normalize_sentiment(entities["outcome"]["sentiment"])
        if entities["outcome"].get("prescription_intent"):
            entities["outcome"]["prescription_intent"] = normalize_level(entities["outcome"]["prescription_intent"])
            
    if "interaction" in entities and entities["interaction"].get("type"):
        entities["interaction"]["type"] = normalize_interaction_type(entities["interaction"]["type"])
        
    if "ai_recommendation" in entities and entities["ai_recommendation"].get("confidence"):
        entities["ai_recommendation"]["confidence"] = normalize_level(entities["ai_recommendation"]["confidence"])
        
    # Normalize flat confidence scores
    for k, v in confidence.items():
        if isinstance(v, str):
            confidence[k] = normalize_level(v)
            
    logger.info(f"Normalized Entities: {entities}")
    logger.info(f"Normalized Confidences: {confidence}")
            
    return {"extracted_entities": entities, "confidence_scores": confidence}

async def log_interaction(state: GraphState) -> GraphState:
    return {"tool_output": {"status": "pending_user_confirmation"}}

async def frontend_preview(state: GraphState) -> GraphState:
    llm = get_llm()
    entities = state.get("extracted_entities", {})
    chain = RESPONSE_FORMATTER_PROMPT | llm
    try:
        response = await chain.ainvoke({"extracted_entities": json.dumps(entities)})
        final_text = response.content
    except Exception as e:
        logger.error(f"Failed to format response: {e}")
        final_text = "Interaction processed."
        
    return {"final_response": final_text}

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Any, List, Optional
import os

from app.db.session import get_db
from app.services.complaint_service import complaint_service
from app.services.document_parser import document_parser
from app.schemas.complaint import (
    AnalyzeTextRequest,
    ComplaintAnalysisResponse,
    CopilotChatRequest,
    CopilotChatResponse,
    SaveComplaintRequest,
    SaveComplaintResponse,
    ComplaintListItem
)
from app.graph.nodes import copilot_chat_service

router = APIRouter()

MAX_FILE_SIZE = 10 * 1024 * 1024 # 10MB

@router.post("/analyze", response_model=ComplaintAnalysisResponse)
async def analyze_complaint_text(
    request: AnalyzeTextRequest,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Extracts structured complaint entities and runs AI QMS assessment on raw text or email.
    """
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text body cannot be empty.")
    try:
        response = await complaint_service.analyze_text(
            raw_text=request.text,
            document_name="Pasted Complaint Text",
            db=db
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@router.post("/upload", response_model=ComplaintAnalysisResponse)
async def upload_complaint_document(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Uploads and parses PDF, DOCX, TXT, or EML complaint documents, then runs LangGraph analysis.
    """
    filename = file.filename or "unknown_file"
    ext = os.path.splitext(filename)[1].lower().strip(".")
    allowed_exts = ["pdf", "docx", "doc", "txt", "eml", "msg", "log", "csv"]
    
    if ext not in allowed_exts:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format '{ext}'. Allowed formats: PDF, DOCX, TXT, EML."
        )
        
    file_bytes = await file.read()
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds maximum allowable limit of 10MB."
        )
        
    if len(file_bytes) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty.")
        
    extracted_text, detected_type = document_parser.parse_document(file_bytes, filename)
    if not extracted_text or not extracted_text.strip():
        raise HTTPException(
            status_code=422,
            detail=f"Could not extract readable text from '{filename}'. Please verify the file is not empty or corrupted."
        )
        
    try:
        response = await complaint_service.analyze_text(
            raw_text=extracted_text,
            document_name=filename,
            db=db
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Document analysis failed: {str(e)}")


@router.post("/copilot", response_model=CopilotChatResponse)
async def copilot_chat(
    request: CopilotChatRequest
) -> Any:
    """
    Contextual AI Copilot chat answering specific questions about the active complaint.
    """
    try:
        reply = await copilot_chat_service(
            user_message=request.message,
            complaint_data=request.complaint_data,
            history=request.history
        )
        return CopilotChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Copilot query failed: {str(e)}")


@router.post("/", response_model=SaveComplaintResponse)
async def save_complaint(
    payload: SaveComplaintRequest,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Saves the complaint form, AI assessment, and audit logs into PostgreSQL.
    """
    try:
        response = await complaint_service.save_complaint(db=db, payload=payload)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save complaint: {str(e)}")


@router.get("/", response_model=List[ComplaintListItem])
async def list_complaints(
    limit: int = 50,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Retrieves all logged complaints for quality review and audit triage.
    """
    try:
        return await complaint_service.get_complaints(db=db, limit=limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch complaints: {str(e)}")


@router.get("/{complaint_id}")
async def get_complaint(
    complaint_id: str,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Retrieves a single complaint with its associated AI assessment.
    """
    result = await complaint_service.get_complaint_by_id(db=db, complaint_id=complaint_id)
    if not result:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return result

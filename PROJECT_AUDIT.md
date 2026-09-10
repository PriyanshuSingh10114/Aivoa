# AIVOA.AI Project Audit

## 1. Current Architecture

```
User
  │ (Upload PDF, DOCX, TXT, EML or Paste Complaint Text)
  ▼
React (Inter Typography, Split-Screen Layout)
  │
  ▼
Redux Toolkit (complaintSlice)
  │
  ▼
FastAPI (/api/v1/complaints/analyze, /api/v1/complaints/upload, /api/v1/complaints, /api/v1/complaints/copilot)
  │
  ▼
Document Parser Service (PyPDF, python-docx, email BytesParser)
  │
  ▼
LangGraph Sequential QMS Pipeline:
  ├── 1. extract_complaint (Extracts origin, product, batch, dates, quantities, defect)
  ├── 2. check_completeness (Calculates GMP Completeness Score 0-100% & missing fields)
  └── 3. assess_risk_and_capa (Calculates Risk Score, Quality/Patient Impact, CAPA, Root Causes, Summary)
  │
  ▼
Groq LLM (Configured with gemma2-9b-it / llama-3.3-70b-versatile + Heuristic Deterministic Fallback)
  │
  ▼
Pydantic Validation & Normalization Engine
  │
  ▼
PostgreSQL Database (complaints, ai_assessments, complaint_documents, complaint_conversations)
```

---

## 2. Frontend Status

| Feature | Status | Evidence | Problem | Required Action |
|---|---|---|---|---|
| **React Framework** | IMPLEMENTED | `src/App.jsx` | None | Retained with Vite build |
| **Redux Toolkit** | IMPLEMENTED | `src/redux/store.js`, `slices/complaintSlice.js` | Migrated from HCP CRM to Complaint QMS | Unified complaint state management |
| **Inter Typography** | IMPLEMENTED | `src/theme/index.js` | None | Fully active across UI |
| **4-Section Complaint Form** | IMPLEMENTED | `src/components/ComplaintForm/` | Was previously an HCP preview | Implemented Origin, Product & Batch, Details, Initial Assessment |
| **Drag & Drop Upload (PDF, DOCX, TXT, EML)** | IMPLEMENTED | `src/components/IntakeAssistant/DocumentDropzone.jsx` | Previously missing | Added file dropzone with 10MB limit and format validation |
| **Raw Text / Email Paste Mode** | IMPLEMENTED | `src/components/IntakeAssistant/TextPasteArea.jsx` | Previously missing | Added multi-line textarea with Extract button |
| **Extraction Progress Indicator** | IMPLEMENTED | `src/components/IntakeAssistant/ExtractionProgress.jsx` | Previously generic dots | Added staged progress tracking pipeline steps |
| **AI Risk Assessment & Score UI** | IMPLEMENTED | `src/components/IntakeAssistant/RiskAssessmentCard.jsx` | Previously missing | Displays Risk Score (0-100), Severity, Impact, & Disclaimer |
| **Completeness Checker UI** | IMPLEMENTED | `src/components/IntakeAssistant/CompletenessCard.jsx` | Previously missing | Displays Completeness % bar & missing fields chips |
| **CAPA & Root Causes UI** | IMPLEMENTED | `src/components/IntakeAssistant/CapaRecommendationsCard.jsx` | Previously missing | Displays potential root causes & corrective/preventive actions |
| **AI Copilot Contextual Q&A** | IMPLEMENTED | `src/components/IntakeAssistant/CopilotChat.jsx` | Was ungrounded | Grounded in active complaint state with prompt chips |
| **Duplicate Alert Banner** | IMPLEMENTED | `src/components/ComplaintForm/FormActionBar.jsx` | Previously missing | Displays matched batch numbers and similarity scores |
| **Save Complaint to Database** | IMPLEMENTED | `src/components/ComplaintForm/FormActionBar.jsx` | Previously targeted HCP tables | Persists full complaint and assessment to PostgreSQL |
| **Reset Form** | IMPLEMENTED | `src/redux/slices/complaintSlice.js` | None | Resets all state and uncommitted edits |

---

## 3. Backend Status

| Component | Status | Evidence | Problem | Required Action |
|---|---|---|---|---|
| **FastAPI Core & CORS** | IMPLEMENTED | `backend/app/main.py` | None | Configured with CORS and API v1 router |
| **Dependency Resolution** | IMPLEMENTED | `backend/requirements.txt` | Previous import error on `langchain-groq` | Updated versions and installed clean in `venv` |
| **Document Parser Service** | IMPLEMENTED | `backend/app/services/document_parser.py` | Previously missing | Parses PDF, DOCX, TXT, EML |
| **Complaint Endpoints** | IMPLEMENTED | `backend/app/api/routers/complaints.py` | Previously missing | Added analyze, upload, copilot, save, and list endpoints |
| **PostgreSQL Persistence** | IMPLEMENTED | `backend/app/services/complaint_service.py` | Previously targeted HCP tables | Added transaction persistence with auto tracking numbers (`CMP-YYYY-XXXX`) |

---

## 4. AI & LangGraph Status

| Component | Status | Evidence | Description |
|---|---|---|---|
| **LangGraph Pipeline** | IMPLEMENTED | `backend/app/graph/graph.py` | StateGraph with `extract_complaint`, `check_completeness`, `assess_risk_and_capa` |
| **Groq Model Integration** | IMPLEMENTED | `backend/app/graph/nodes.py` | Configurable `GROQ_MODEL=gemma2-9b-it` with `llama-3.3-70b-versatile` fallback |
| **Hallucination Prevention** | IMPLEMENTED | `backend/app/graph/prompts.py` | Strict instruction to return `null` if field is absent; never invent batch or dates |
| **Deterministic Fallback** | IMPLEMENTED | `backend/app/graph/nodes.py` | Regex-based heuristic extractor ensuring 0% data drop on network/API limits |

---

## 5. Database Status

| Table | Status | Key Fields |
|---|---|---|
| `complaints` | IMPLEMENTED | `id`, `tracking_number`, `complaint_source`, `customer_name`, `product_name`, `product_strength`, `batch_number`, `manufacturing_date`, `expiry_date`, `quantity_affected`, `complaint_type`, `complaint_date`, `description`, `severity`, `priority`, `status`, `created_at` |
| `ai_assessments` | IMPLEMENTED | `id`, `complaint_id`, `risk_level`, `risk_score`, `patient_impact`, `quality_impact`, `investigation_required`, `recall_evaluation_required`, `category`, `defect_type`, `completeness_score`, `is_complete`, `missing_fields`, `reasoning`, `potential_root_causes`, `corrective_actions`, `preventive_actions`, `executive_summary` |
| `complaint_documents` | IMPLEMENTED | `id`, `complaint_id`, `file_name`, `file_type`, `file_size`, `extracted_text`, `created_at` |
| `complaint_conversations` | IMPLEMENTED | `id`, `complaint_id`, `role`, `message`, `created_at` |

---

## 6. End-to-End Status

Trace of an actual request:
1. **User Action:** Uploads `complaint_high_risk.pdf` or pastes complaint email text.
2. **Frontend:** React dispatches `processComplaintFile` or `processComplaintText` via Redux Toolkit.
3. **Network / API:** HTTP multipart POST sent to `/api/v1/complaints/upload` or `/api/v1/complaints/analyze`.
4. **Backend Processing:** `DocumentParserService` extracts raw text from PDF/DOCX/TXT/EML.
5. **AI Execution:** LangGraph invokes `complaint_agent` compiling `extract_complaint` → `check_completeness` → `assess_risk_and_capa`.
6. **LLM Execution:** Calls Groq (`gemma2-9b-it` or `llama-3.3-70b-versatile`) with structured JSON prompts and anti-hallucination constraints.
7. **Pydantic Validation:** Raw JSON is parsed, validated, and normalized into `ComplaintAnalysisResponse`.
8. **Frontend Update:** Redux `complaintSlice` automatically populates the 4 form sections, displays Risk Score gauge, Completeness progress bar, missing fields, and CAPA considerations.
9. **User Review & Edit:** User inspects extracted data, edits any field manually.
10. **Persistence:** User clicks "Save Complaint". Backend generates tracking number `CMP-2026-XXXX` and commits record transactionally to PostgreSQL.

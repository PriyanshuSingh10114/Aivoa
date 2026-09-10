# AIOVA.AI System Architecture

## 1. System Architecture Diagram

```
+-----------------------------------------------------------------------------------+
|                                 FRONTEND (React + Vite)                           |
|                                                                                   |
|   +---------------------------------------+   +-------------------------------+   |
|   | LEFT PANEL: Log Customer Complaint    |   | RIGHT PANEL: AI Intake Assist |   |
|   |  - Origin & Customer Details          |   |  - Drag/Drop Upload (PDF/DOCX)|   |
|   |  - Product & Batch Identification     |   |  - Paste Raw Email / Text     |   |
|   |  - Complaint Defect Details           |   |  - Real Extraction Progress   |   |
|   |  - Initial Assessment & Priority      |   |  - AI Risk Assessment & Score |   |
|   |  - Form Action Bar (Reset / Save)     |   |  - Completeness & Missing Info|   |
|   |  - Duplicate Detection Alert          |   |  - CAPA & Root Cause Recs     |   |
|   |                                       |   |  - Contextual AI Copilot Chat |   |
|   +---------------------------------------+   +-------------------------------+   |
|                                       │                                           |
|                                       ▼                                           |
|                        Redux Toolkit (complaintSlice)                             |
+---------------------------------------┬-------------------------------------------+
                                        │ HTTP REST (JSON / Multipart)
                                        ▼
+-----------------------------------------------------------------------------------+
|                                 BACKEND (FastAPI)                                 |
|                                                                                   |
|  Endpoints:                                                                       |
|   - POST /api/v1/complaints/analyze       - POST /api/v1/complaints/upload        |
|   - POST /api/v1/complaints/copilot       - POST /api/v1/complaints/ (Save)       |
|   - GET  /api/v1/complaints/ (List)       - GET  /api/v1/complaints/{id}          |
|                                       │                                           |
|                                       ▼                                           |
|                         Document Parser Service                                   |
|                        (pypdf, python-docx, email)                                |
|                                       │                                           |
|                                       ▼                                           |
|                             LangGraph StateGraph                                  |
|                                       │                                           |
|          +----------------------------+----------------------------+              |
|          │                            │                            │              |
|          ▼                            ▼                            ▼              |
|   1. extract_complaint       2. check_completeness     3. assess_risk_and_capa    |
|   (JSON prompt extraction)   (GMP completeness score)  (Risk Score, CAPA, Summary)|
|          │                            │                            │              |
|          +----------------------------+----------------------------+              |
|                                       │                                           |
|                                       ▼                                           |
|                              Groq LLM Engine                                      |
|             (Primary: gemma2-9b-it | Fallback: llama-3.3-70b-versatile            |
|                       + Heuristic Deterministic Extractor)                        |
|                                       │                                           |
|                                       ▼                                           |
|                         Pydantic Validation & Normalizer                          |
|                                       │                                           |
|                                       ▼                                           |
|                         SQLAlchemy Async Session Engine                           |
+---------------------------------------┬-------------------------------------------+
                                        │
                                        ▼
+-----------------------------------------------------------------------------------+
|                              DATABASE (PostgreSQL)                                |
|                                                                                   |
|   - complaints (Core QMS triage, tracking numbers, batch, product, dates)         |
|   - ai_assessments (Risk scores, patient/quality impact, CAPA, summary)          |
|   - complaint_documents (Original file metadata and text preview)                 |
|   - complaint_conversations (Audit log of Copilot interaction history)            |
+-----------------------------------------------------------------------------------+
```

---

## 2. Frontend Architecture
- **State Management:** Redux Toolkit manages the active complaint form, AI assessments, upload status, and chat messages in a centralized store (`complaintSlice`).
- **Design System:** Material UI v5 configured with custom enterprise tokens (clean borders `#E2E8F0`, slate palette `#0F172A`, accent blue `#2563EB`).
- **Typography:** Google Inter font via `@fontsource/inter`.
- **Validation & Two-Way Binding:** Every form field is editable manually and updates live upon AI extraction.

---

## 3. Backend & AI Architecture
- **FastAPI Core:** Async architecture with standard OpenAPI/Swagger specification.
- **LangGraph Multi-Node Workflow:** Sequential execution model ensuring clear separation of extraction, validation, risk calculation, and recommendation generation.
- **Groq AI Integration:** Configurable model via `.env` (`gemma2-9b-it` or `llama-3.3-70b-versatile`) with automatic error recovery.
- **Resilience Engine:** Dual fallback system:
  1. Primary Model (`gemma2-9b-it`) → Secondary Model (`llama-3.3-70b-versatile`).
  2. Rule-Based Heuristic Regex Parser guaranteeing 0% data loss even during network outages.

---

## 4. Security & Compliance Model
- **GxP & 21 CFR Part 11 Alignment:** Audit trail preservation (`complaint_conversations`, timestamps, original document text).
- **Zero API Key Leakage:** Groq API keys remain strictly on the backend and are never exposed to the client.
- **SQL Injection Prevention:** Parameterized queries via SQLAlchemy ORM.
- **Input Validation:** Multipart file size (10MB limit), MIME type enforcement, and Pydantic schema validation.

# AIOVA.AI: AI-Powered Customer Complaint Management System
### API & Finished Dosage Form (FDF) Quality Assurance QMS Module

![AIOVA QMS](https://img.shields.io/badge/AIOVA.AI-Pharma_QMS-2563EB?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![LangGraph](https://img.shields.io/badge/LangGraph-FF4F00?style=for-the-badge)
![Groq](https://img.shields.io/badge/Groq-Gemma_2_9B-F55036?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

An enterprise-grade, single-module AI-First Customer Complaint Management System built specifically for Pharmaceutical Manufacturers, Active Pharmaceutical Ingredient (API) suppliers, and Finished Dosage Form (FDF) Quality Units.

This application automates document intake (PDF, DOCX, TXT, EML) and unstructured customer email processing using a sequential **LangGraph** workflow powered by **Groq** (`gemma2-9b-it` / `llama-3.3-70b-versatile`). It extracts structured defect data, checks GMP completeness, calculates risk scores, suggests CAPA considerations, flags duplicate complaints, and commits validated triage records to **PostgreSQL**.

---

## 🌟 Core Features

- **Multi-Format Document Intake:** Drag & drop complaint documents (PDF, DOCX, TXT, EML up to 10MB) or paste raw customer emails.
- **Sequential LangGraph QMS Pipeline:**
  1. `extract_complaint`: Extracts Origin, Product, Batch #, MFD, EXP, Quantity, and Defect Category.
  2. `check_completeness`: Evaluates GMP completeness (0–100%) and highlights missing regulatory fields.
  3. `assess_risk_and_capa`: Calculates Risk Score (0–100), Patient Safety Impact, Quality Impact, Investigation recommendations, and CAPA considerations.
- **Reference UI Layout (GxP Validated Mode):**
  - **Left Panel (58%):** 4-section "Log Customer Complaint" form (`Origin & Customer Details`, `Product & Batch Identification`, `Complaint Details`, `Initial Assessment & Priority`).
  - **Right Panel (42%):** "AI Complaint Intake Assistant" with Document Dropzone, Raw Text Paste, Staged Extraction Progress, AI Risk Card, Completeness Badge, CAPA Card, and AI Copilot Chat.
- **Duplicate Complaint Detection:** Identifies potential duplicates by comparing batch numbers and product names against historical PostgreSQL records.
- **Contextual AI Copilot:** Interactive chat assistant grounded in the active complaint context.
- **Resilience & Safety Guardrails:**
  - Strict anti-hallucination prompts enforcing `null` for absent fields.
  - Dual fallback protection (Model Retry + Deterministic Heuristic Regex Extractor) ensuring 0% data loss.
  - Advisory disclaimer framing (AI recommendation vs. final Quality Unit decision).

---

## 🏗 Architecture

```
User Input (PDF / DOCX / TXT / EML / Text)
  │
  ▼
React (Inter Typography, 58/42 Split-Screen Workspace)
  │
  ▼
Redux Toolkit (complaintSlice: form, completeness, risk, CAPA, chat)
  │
  ▼
FastAPI Backend (/api/v1/complaints/analyze, upload, copilot, save, list)
  │
  ▼
Document Parser Service (pypdf, python-docx, email parser)
  │
  ▼
LangGraph StateGraph Engine:
  ├── 1. extract_complaint
  ├── 2. check_completeness
  └── 3. assess_risk_and_capa
  │
  ▼
Groq LLM (gemma2-9b-it | fallback: llama-3.3-70b-versatile)
  │
  ▼
Strict Pydantic Validation & Normalizer
  │
  ▼
PostgreSQL Database (complaints, ai_assessments, documents, conversations)
```

---

## 🚀 Running the Application Locally

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- PostgreSQL running locally on port 5432 (or via Docker)

### 1. Environment Setup
Configure your `backend/.env` file:
```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=gemma2-9b-it
GROQ_FALLBACK_MODEL=llama-3.3-70b-versatile

POSTGRES_SERVER=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=aiova_crm
POSTGRES_PORT=5432
```

### 2. Backend Startup
In your terminal (PowerShell):
```powershell
cd "e:\Internship Assignment\Aiova\backend"

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Start the FastAPI server
uvicorn app.main:app --reload --port 8000
```
> **Backend API:** `http://localhost:8000`  
> **Interactive Swagger Docs:** `http://localhost:8000/docs`

### 3. Frontend Startup
In a second terminal:
```powershell
cd "e:\Internship Assignment\Aiova\frontend"

# Start Vite dev server
npm run dev
```
> **Frontend App:** `http://localhost:5173`

---

## 🐳 Running with Docker Compose

```powershell
docker-compose up --build
```

---

## 🧪 5-Minute Demo Workflow

1. **Open the App:** Navigate to `http://localhost:5173`.
2. **Upload High-Risk Complaint Document:**
   - In the right-hand **AI Complaint Intake Assistant**, upload `backend/tests/demo_data/complaint_high_risk.pdf` (or copy text from `complaint_high_risk.txt`).
3. **Inspect Live Auto-Fill:**
   - Watch the left form populate instantly with:
     - Customer: *Apollo Hospitals Central Pharmacy*
     - Product: *Paracetamol Tablets 500mg*
     - Batch: *PCM240817*
     - Dates: *2024-03-15 (MFD) / 2026-03-14 (EXP)*
     - Defect: *Color / Discoloration*
4. **Review AI Quality Assessment:**
   - Check the **AI-Assisted Risk Assessment** card (`82/100 - High Risk`), Patient/Quality Impact tags, and CAPA recommendations (quarantine retain samples, review blister sealing).
5. **Interact with AI Copilot:**
   - Click the prompt chip *"What are the major risk factors?"* to demonstrate contextual intelligence.
6. **Save to PostgreSQL:**
   - Click **Save Complaint**. A green banner displays the committed tracking number (`CMP-2026-XXXX`).
7. **Test Duplicate Detection:**
   - Paste `backend/tests/demo_data/complaint_duplicate.txt` into the paste tab. An orange warning banner alerts that Batch `PCM240817` has already been logged.

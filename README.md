# Aiova Health CRM: AI-First HCP Interaction Logger

![Aiova Health CRM](https://img.shields.io/badge/Aiova-Health_CRM-2563EB?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![LangGraph](https://img.shields.io/badge/LangGraph-FF4F00?style=for-the-badge)

An enterprise-grade, single-module AI-First CRM built specifically for Pharmaceutical Medical Representatives. This application replaces traditional manual data entry with an intelligent Conversational AI interface that automatically extracts, validates, and normalizes Healthcare Professional (HCP) interactions into a strictly structured PostgreSQL database.

**Author:** Priyanshu Singh  
**GitHub:** [PriyanshuSingh10114](https://github.com/PriyanshuSingh10114)  

---

## 🌟 Core Features

- **AI-Powered Data Extraction:** Uses LangGraph and Groq LLMs to extract structured entities (Doctor Name, Hospital, Products, Sentiment, etc.) from natural language conversation.
- **Robust JSON Parsing Engine:** Replaces brittle LLM function-calling with a fault-tolerant raw JSON parser, regex cleaner, and explicit Python normalization utilities to guarantee 0% failure rates on extraction.
- **Live CRM Preview:** As the user chats with the AI, the right-hand panel instantly updates to reflect the structured data ready for CRM insertion.
- **Strict Data Validation:** Enforces presence of required CRM fields (Doctor Name, Speciality, Interaction Type, Summary, etc.) before allowing the user to commit to the database.
- **Transactional Database Persistence:** Fully normalized SQLAlchemy architecture (`HCP`, `Interaction`, `Products`, `Materials`, `FollowUp`). A single click on "Submit to CRM" safely commits the entire nested payload, including the complete conversation history.
- **Enterprise SaaS UX:** Built with React, Material UI, and Inter typography, providing a distraction-free, highly professional split-screen interface.

## 🏗 Architecture

### 1. Frontend (React / Vite / Redux)
- **State Management:** Redux Toolkit handles the complex state between the `chatSlice` and the `formSlice` via deep-merge utilities.
- **UI System:** Material UI components configured with a custom Enterprise SaaS theme (Sticky AppBars, Action Bars, smooth shadows, and validation banners).

### 2. Backend (Python / FastAPI)
- **API Engine:** High-performance async FastAPI application.
- **Database ORM:** SQLAlchemy AsyncSessions securely map the validated Pydantic payloads to PostgreSQL tables.
- **AI Engine (LangGraph):** A multi-node pipeline:
  1. *Intent Detection:* Determines if the user is logging or editing.
  2. *Entity Extraction:* Prompts the Groq LLM for a strict JSON schema.
  3. *Normalization:* Manually coerces LLM string variance into strict Enums (e.g. "Highly Positive" -> `Positive`).

### 3. Database (PostgreSQL)
A robust, 3NF normalized schema designed for analytical scalability:
- `hcp`: Stores demographic data.
- `interactions`: Core table tracking visit summaries and outcomes.
- `products` & `interaction_products`: Tracks primary and secondary products discussed.
- `materials_shared`: Tracks brochures and sample distribution.
- `followups`: Schedules next actions.
- `conversation_history`: Archival of the raw chat logs for audit purposes.

---

## 🚀 Running the Project Locally

### Prerequisites
- Node.js (v18+)
- Python (3.10+)
- PostgreSQL (Running locally or via Docker)
- Groq API Key

### 1. Database Setup
1. Open pgAdmin or your PostgreSQL CLI.
2. Create a new database named `aiova_crm`.
3. Update the credentials in `backend/.env`:
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_SERVER=localhost
POSTGRES_PORT=5432
POSTGRES_DB=aiova_crm
GROQ_API_KEY=your_groq_api_key
```

### 2. Backend Setup
Navigate to the backend directory, set up your virtual environment, and run the server:
```bash
cd backend
python -m venv venv
source venv/Scripts/activate  # On Windows
pip install -r requirements.txt

# Run Alembic migrations to generate tables
alembic upgrade head

# Start the FastAPI server
uvicorn app.main:app --reload
```
*The API will be available at `http://127.0.0.1:8000`*

### 3. Frontend Setup
Navigate to the frontend directory, install dependencies, and start Vite:
```bash
cd frontend
npm install
npm run dev
```
*The UI will be available at `http://localhost:5173`*

---

## 🧪 Testing the Workflow

1. Open the frontend in your browser.
2. In the AI Copilot on the left, type an interaction:
   > *"I just met with Dr. Sarah Jenkins at Apollo Hospital. She is a Cardiologist. We had a great meeting discussing CardioX. I left her a brochure and 10 samples. She was very positive. Follow up next Tuesday."*
3. Watch the Live CRM Preview populate instantly.
4. (Optional) Notice if a required field is missing (e.g. Interaction Type), the bottom Action Bar will display a red error blocking you from saving. Reply to the AI to provide it.
5. Click **Submit to CRM**.
6. Observe the green success banner and verify the data in your PostgreSQL database!

---
*Built as an assignment for Aiova Health.*

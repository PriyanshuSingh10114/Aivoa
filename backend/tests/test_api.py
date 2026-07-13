import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_chat_endpoint_mocked(mocker):
    # Mock the LangGraph agent to avoid needing Groq API keys during tests
    mock_agent = mocker.patch("app.api.routers.chat.crm_agent")
    
    # Setup mock return state
    mock_agent.ainvoke.return_value = {
        "extracted_entities": {
            "doctor": "Dr. Test",
            "hospital": "Test Hospital",
            "products": ["Test Product"],
            "sentiment": "Positive",
            "action_items": ["Send info"],
            "follow_up": "Next week"
        },
        "needs_confirmation": True,
        "final_response": "I have extracted the info."
    }
    
    response = client.post(
        "/api/v1/chat/",
        json={"message": "Met Dr. Test at Test Hospital."}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert data["doctor"] == "Dr. Test"
    assert data["hospital"] == "Test Hospital"
    assert data["summary_generated"] == True
    assert data["needs_confirmation"] == True

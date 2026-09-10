import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Analyze pasted text or email
export const analyzeComplaintText = async (text) => {
  const response = await api.post('/complaints/analyze', { text });
  return response.data;
};

// Upload document (PDF, DOCX, TXT, EML)
export const uploadComplaintDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/complaints/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Save Complaint to PostgreSQL
export const saveComplaint = async (payload) => {
  const response = await api.post('/complaints/', payload);
  return response.data;
};

// List recent complaints
export const getComplaints = async (limit = 50) => {
  const response = await api.get(`/complaints/?limit=${limit}`);
  return response.data;
};

// Get single complaint details
export const getComplaintById = async (id) => {
  const response = await api.get(`/complaints/${id}`);
  return response.data;
};

// Contextual AI Copilot Chat
export const chatWithCopilot = async (message, complaintData = null, history = []) => {
  const response = await api.post('/complaints/copilot', {
    message,
    complaint_data: complaintData,
    history,
  });
  return response.data;
};

// Legacy HCP CRM support
export const chatWithAgent = async (message, current_state = null) => {
  const response = await api.post('/chat/', { message, current_state });
  return response.data;
};

export const saveInteraction = async (data, chatMessages = [], interactionId = null) => {
  const payload = {
    data,
    conversation: chatMessages,
    interaction_id: interactionId,
  };
  const response = await api.post('/interaction/', payload);
  return response.data;
};

export const getHistory = async (hcp) => {
  const response = await api.get(`/interaction/history/${hcp}`);
  return response.data;
};

export default api;

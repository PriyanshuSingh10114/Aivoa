import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatWithAgent = async (message, current_state = null) => {
  const response = await api.post('/chat/', { message, current_state });
  return response.data;
};

export const saveInteraction = async (data, chatMessages = [], interactionId = null) => {
  const payload = {
    data,
    conversation: chatMessages,
    interaction_id: interactionId
  };
  const response = await api.post('/interaction/', payload);
  return response.data;
};

export const getHistory = async (hcp) => {
  const response = await api.get(`/interaction/history/${hcp}`);
  return response.data;
};

export default api;

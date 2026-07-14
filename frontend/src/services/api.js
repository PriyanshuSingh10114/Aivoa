import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatWithAgent = async (message) => {
  const response = await api.post('/chat/', { message });
  return response.data;
};

export const saveInteraction = async (data, chatMessages = []) => {
  const payload = {
    data,
    conversation: chatMessages
  };
  const response = await api.post('/interaction/', payload);
  return response.data;
};

export const getHistory = async (hcp) => {
  const response = await api.get(`/interaction/history/${hcp}`);
  return response.data;
};

export default api;

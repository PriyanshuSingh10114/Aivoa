import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatWithAgent } from '../../services/api';

const initialState = {
  currentDoctor: null,
  chatMessages: [
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your AI assistant. Tell me about your recent interaction or fill out the form.',
      timestamp: new Date().toISOString()
    }
  ],
  interactionForm: {
    doctorName: '',
    hospital: '',
    speciality: '',
    interactionType: 'In-Person',
    visitDate: new Date().toISOString().split('T')[0],
    duration: 15,
    productsDiscussed: [],
    competitorProducts: [],
    discussionNotes: '',
    doctorFeedback: '',
    objections: [],
    commitments: [],
    nextFollowUpDate: ''
  },
  aiSuggestions: null,
  isLoading: false,
  error: null,
};

const interactionSlice = createSlice({
  name: 'interaction',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    addChatMessage: (state, action) => {
      state.chatMessages.push({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString()
      });
    },
    updateInteractionForm: (state, action) => {
      state.interactionForm = { ...state.interactionForm, ...action.payload };
    },
    setAiSuggestions: (state, action) => {
      state.aiSuggestions = action.payload;
    },
    resetForm: (state) => {
      state.interactionForm = initialState.interactionForm;
    }
  }
});

export const { 
  setLoading, 
  addChatMessage, 
  updateInteractionForm, 
  setAiSuggestions, 
  resetForm 
} = interactionSlice.actions;

export const sendChatMessage = createAsyncThunk(
  'interaction/sendChatMessage',
  async (message, { dispatch }) => {
    // 1. Add user message to UI immediately
    dispatch(addChatMessage({ sender: 'user', text: message }));
    dispatch(setLoading(true));
    try {
      // 2. Call API
      const response = await chatWithAgent(message);
      
      // 3. Add AI response to UI
      dispatch(addChatMessage({ sender: 'ai', text: response.ai_message }));
      
      // 4. Update Form with extracted entities
      dispatch(updateInteractionForm({
        doctorName: response.doctor || '',
        hospital: response.hospital || '',
        productsDiscussed: response.products || [],
        sentiment: response.sentiment || '',
        discussionNotes: response.action_items ? response.action_items.join(', ') : '',
        nextFollowUpDate: response.follow_up || ''
      }));

      // 5. Update Suggestions
      if (response.summary_generated) {
        dispatch(setAiSuggestions(response));
      }

      return response;
    } catch (error) {
      dispatch(addChatMessage({ sender: 'ai', text: 'Sorry, I encountered an error communicating with the server.' }));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export default interactionSlice.reducer;

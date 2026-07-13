import { createSlice } from '@reduxjs/toolkit';

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

export default interactionSlice.reducer;

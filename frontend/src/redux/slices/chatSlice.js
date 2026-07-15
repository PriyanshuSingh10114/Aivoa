import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatWithAgent } from '../../services/api';

const initialState = {
  chatMessages: [
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am your AI assistant. Tell me about your recent interaction or fill out the form.',
      timestamp: new Date().toISOString()
    }
  ],
  aiSuggestions: null,
  isLoading: false,
  error: null,
  shouldSave: false,
  shouldClear: false,
};

export const sendChatMessage = createAsyncThunk(
  'chat/sendChatMessage',
  async (message, { dispatch, getState }) => {
    // Get current form state to provide context to the backend
    const currentState = getState().form.interactionForm;
    
    // Dispatch optimistic user message
    dispatch(chatSlice.actions.addOptimisticMessage({ sender: 'user', text: message }));
    const response = await chatWithAgent(message, currentState);
    return response;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addOptimisticMessage: (state, action) => {
      state.chatMessages.push({
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString()
      });
    },
    setAiSuggestions: (state, action) => {
      state.aiSuggestions = action.payload;
    },
    clearChat: (state) => {
      state.chatMessages = initialState.chatMessages;
      state.aiSuggestions = null;
      state.error = null;
      state.shouldSave = false;
      state.shouldClear = false;
    },
    resetActionFlags: (state) => {
      state.shouldSave = false;
      state.shouldClear = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendChatMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendChatMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        // Handle Conversational Actions
        if (action.payload.reply === "save_action_triggered") {
          state.shouldSave = true;
          state.chatMessages.push({
            id: Date.now(), sender: 'ai', text: 'Saving interaction to CRM...', timestamp: new Date().toISOString()
          });
        } else if (action.payload.reply === "clear_action_triggered") {
          state.shouldClear = true;
        } else {
          // Append AI message
          state.chatMessages.push({
            id: Date.now(),
            sender: 'ai',
            text: action.payload.reply || 'Processed successfully.',
            timestamp: new Date().toISOString()
          });
        }
        
        // Update suggestions if data is valid
        if (action.payload.status === "success") {
          state.aiSuggestions = action.payload;
        }
      })
      .addCase(sendChatMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.chatMessages.push({
          id: Date.now(),
          sender: 'ai',
          text: 'Sorry, I encountered an error communicating with the server.',
          timestamp: new Date().toISOString()
        });
      });
  }
});

export const { addOptimisticMessage, setAiSuggestions, clearChat, resetActionFlags } = chatSlice.actions;
export default chatSlice.reducer;

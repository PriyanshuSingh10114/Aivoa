import { createSlice } from '@reduxjs/toolkit';
import { sendChatMessage } from './chatSlice';

const initialState = {
  interactionForm: {
    hcp: { doctor_name: '', hospital: '', speciality: '' },
    interaction: { type: '', date: '', duration: '' },
    products: { primary: '', secondary: [], competitors: [] },
    discussion: { summary: '', doctor_feedback: '', objections: [] },
    materials: { shared: [], samples_distributed: false, sample_quantity: 0 },
    outcome: { sentiment: '', prescription_intent: '' },
    follow_up: { date: '', notes: '' },
    ai_recommendation: { next_best_action: '', confidence: '' }
  },
  confidence: {}
};

// Helper for deep merging
const mergeState = (target, source) => {
  if (!source) return target;
  if (!target) return source;
  
  const result = { ...target };
  Object.keys(source).forEach(key => {
    const sourceVal = source[key];
    if (sourceVal !== null && sourceVal !== undefined) {
      if (Array.isArray(sourceVal)) {
        if (sourceVal.length > 0) result[key] = sourceVal;
      } else if (typeof sourceVal === 'object') {
        result[key] = mergeState(result[key], sourceVal);
      } else if (sourceVal !== "") {
        result[key] = sourceVal;
      }
    }
  });
  return result;
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateInteractionForm: (state, action) => {
      state.interactionForm = mergeState(state.interactionForm, action.payload);
    },
    resetForm: (state) => {
      state.interactionForm = initialState.interactionForm;
      state.confidence = {};
    }
  },
  extraReducers: (builder) => {
    // Automatically update form when AI returns extracted concise entities
    builder.addCase(sendChatMessage.fulfilled, (state, action) => {
      const { structured_data, confidence } = action.payload;
      
      if (structured_data) {
        state.interactionForm = mergeState(state.interactionForm, structured_data);
      }
      
      if (confidence) {
        // Confidence comes in as a flat dict with High/Medium/Low
        state.confidence = { ...state.confidence, ...confidence };
      }
    });
  }
});

export const { updateInteractionForm, resetForm } = formSlice.actions;
export default formSlice.reducer;

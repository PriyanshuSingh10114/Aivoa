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
  confidence: {},
  updatedFields: []
};

// Helper for deep merging
const mergeState = (target, source) => {
  if (!source) return target;
  if (!target) return source;
  
  const result = { ...target };
  Object.keys(source).forEach(key => {
    const sourceVal = source[key];
    if (sourceVal !== null && sourceVal !== undefined) {
      if (typeof sourceVal === 'object' && !Array.isArray(sourceVal)) {
        result[key] = mergeState(result[key], sourceVal);
      } else {
        result[key] = sourceVal;
      }
    }
  });
  return result;
};

// Helper to track which fields changed
const getUpdatedKeys = (oldObj, newObj, path = '') => {
  let keys = [];
  if (!newObj) return keys;
  
  Object.keys(newObj).forEach(k => {
    const newVal = newObj[k];
    const oldVal = oldObj[k];
    const currentPath = path ? `${path}.${k}` : k;
    
    if (newVal !== null && newVal !== undefined) {
      if (Array.isArray(newVal)) {
        if (JSON.stringify(newVal) !== JSON.stringify(oldVal)) keys.push(currentPath);
      } else if (typeof newVal === 'object') {
        keys = [...keys, ...getUpdatedKeys(oldVal || {}, newVal, currentPath)];
      } else {
        if (newVal !== oldVal) keys.push(currentPath);
      }
    }
  });
  return keys;
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateInteractionForm: (state, action) => {
      const diff = getUpdatedKeys(state.interactionForm, action.payload);
      state.updatedFields = diff;
      state.interactionForm = mergeState(state.interactionForm, action.payload);
    },
    clearUpdatedFields: (state) => {
      state.updatedFields = [];
    },
    resetForm: (state) => {
      state.interactionForm = initialState.interactionForm;
      state.confidence = {};
      state.updatedFields = [];
    }
  },
  extraReducers: (builder) => {
    // Automatically update form when AI returns extracted concise entities
    builder.addCase(sendChatMessage.fulfilled, (state, action) => {
      const { structured_data, confidence, reply } = action.payload;
      
      if (structured_data && reply !== "save_action_triggered" && reply !== "clear_action_triggered") {
        const diff = getUpdatedKeys(state.interactionForm, structured_data);
        state.updatedFields = diff;
        state.interactionForm = mergeState(state.interactionForm, structured_data);
      }
      
      if (confidence) {
        // Confidence comes in as a flat dict with High/Medium/Low
        state.confidence = { ...state.confidence, ...confidence };
      }
    });
  }
});

export const { updateInteractionForm, resetForm, clearUpdatedFields } = formSlice.actions;
export default formSlice.reducer;

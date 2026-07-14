import { createSlice } from '@reduxjs/toolkit';
import { sendChatMessage } from './chatSlice';

const initialState = {
  currentDoctor: null,
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
    materialsShared: [],
    sentiment: 'Neutral',
    nextFollowUpDate: ''
  },
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateInteractionForm: (state, action) => {
      state.interactionForm = { ...state.interactionForm, ...action.payload };
    },
    resetForm: (state) => {
      state.interactionForm = initialState.interactionForm;
    }
  },
  extraReducers: (builder) => {
    // Automatically update form when AI returns extracted entities
    builder.addCase(sendChatMessage.fulfilled, (state, action) => {
      const response = action.payload;
      if (response) {
        state.interactionForm = {
          ...state.interactionForm,
          doctorName: response.doctor || state.interactionForm.doctorName,
          hospital: response.hospital || state.interactionForm.hospital,
          productsDiscussed: response.products || state.interactionForm.productsDiscussed,
          sentiment: response.sentiment || state.interactionForm.sentiment,
          actionItems: response.action_items || state.interactionForm.actionItems,
          nextFollowUpDate: response.follow_up || state.interactionForm.nextFollowUpDate
        };
      }
    });
  }
});

export const { updateInteractionForm, resetForm } = formSlice.actions;
export default formSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import complaintReducer from './slices/complaintSlice';
import formReducer from './slices/formSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    complaint: complaintReducer,
    form: formReducer,
    chat: chatReducer,
  },
});

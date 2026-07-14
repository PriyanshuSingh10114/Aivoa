import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    form: formReducer,
    chat: chatReducer,
  },
});

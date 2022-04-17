import { configureStore } from '@reduxjs/toolkit';
import bisericiReducer from './features/biserici/bisericiSlice';
import persoaneReducer from './features/persoaneSlice';

export const store = configureStore({
  reducer: {
      biserici: bisericiReducer,
      persoane: persoaneReducer,
      devTools: process.env.NODE_ENV !== 'production',
  },
});

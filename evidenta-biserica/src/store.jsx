import { configureStore } from '@reduxjs/toolkit';
import bisericiReducer from './features/biserici/bisericiSlice';
import persoaneReducer from './features/persoaneSlice';
import contributiiReducer from './features/contributiiSlice';

export const store = configureStore({
  reducer: {
      biserici: bisericiReducer,
      persoane: persoaneReducer,
      contributii: contributiiReducer,
      devTools: process.env.NODE_ENV !== 'production',
  },
});

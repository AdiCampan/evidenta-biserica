import { configureStore } from '@reduxjs/toolkit';
import bisericiReducer from './features/biserici/bisericiSlice';
import persoaneReducer from './features/persoaneSlice';
import contributiiReducer from './features/contributiiSlice';
import { churchesApi } from  './services/churches';
import { membersApi } from './services/members';

export const store = configureStore({
  reducer: {
      biserici: bisericiReducer,
      persoane: persoaneReducer,
      contributii: contributiiReducer,
      [churchesApi.reducerPath]: churchesApi.reducer,
      [membersApi.reducerPath]: membersApi.reducer,
      devTools: process.env.NODE_ENV !== 'production',
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(churchesApi.middleware),
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(membersApi.middleware),
    
});

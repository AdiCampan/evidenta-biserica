import { configureStore } from '@reduxjs/toolkit';
import bisericiReducer from './features/biserici/bisericiSlice';
import persoaneReducer from './features/persoaneSlice';
import contributiiReducer from './features/contributiiSlice';
import { churchesApi } from  './services/churches';
import { membersApi } from './services/members';

export const store = configureStore({
  reducer: {
      // basic reducers - these should be removed
      biserici: bisericiReducer,
      persoane: persoaneReducer,
      contributii: contributiiReducer,
      // reducers using rtk query
      [churchesApi.reducerPath]: churchesApi.reducer,
      [membersApi.reducerPath]: membersApi.reducer,
      devTools: process.env.NODE_ENV !== 'production',
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    churchesApi.middleware,
    membersApi.middleware,
  ]),
});

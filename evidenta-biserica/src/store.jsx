import { configureStore } from '@reduxjs/toolkit';
import { churchesApi } from  './services/churches';
import { membersApi } from './services/members';
import { specialCasesApi } from './services/specialCases';

export const store = configureStore({
  reducer: {
      // basic reducers - these should be removed

      // reducers using rtk query
      [churchesApi.reducerPath]: churchesApi.reducer,
      [membersApi.reducerPath]: membersApi.reducer,
      [specialCasesApi.reducerPath]: specialCasesApi.reducer,
      devTools: process.env.NODE_ENV !== 'production',
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
    churchesApi.middleware,
    membersApi.middleware,
    specialCasesApi.middleware,
  ]),
});

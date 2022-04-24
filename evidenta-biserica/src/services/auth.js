import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://evidenta-biserica.herokuapp.com/' }),
  tagTypes: ['user'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['user'],
    }),
    signup: builder.mutation({
      query: (newUser) => ({
        url: `auth/register`,
        method: 'POST',
        body: newUser
      }),
      invalidatesTags: ['user'],
    }),
  }),
});

  // Export hooks for usage in functional components
  export const {
    useLoginMutation,
    useSignupMutation,
  } = authApi;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const churchesApi = createApi({
  reducerPath: 'churchesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://evidenta-biserica.herokuapp.com/' }),
  tagTypes: [],
  endpoints: (builder) => ({
    getChurches: builder.query({
      query: () => `churches/`,
    }),
    addChurch: builder.mutation({
        query: (body) => ({
            url: 'churches/',
            method: 'POST',
            body: body,
        }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetChurchesQuery, useAddChurchMutation } = churchesApi;


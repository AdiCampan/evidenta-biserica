import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const churchesApi = createApi({
  reducerPath: 'churchesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://evidenta-biserica.herokuapp.com/' }),
  tagTypes: ['churches'],
  endpoints: (builder) => ({
    getChurches: builder.query({
      query: () => `churches/`,
      providesTags: ['churches'],
    }),
    addChurch: builder.mutation({
      query: (body) => ({
        url: 'churches/',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['churches'],
    }),
    delChurch: builder.mutation({
      query: (id) => ({
        url: `churches/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['churches'],
    })
  
}),
});

// Export hooks for usage in functional components
export const { useGetChurchesQuery, useAddChurchMutation, useDelChurchMutation } = churchesApi;


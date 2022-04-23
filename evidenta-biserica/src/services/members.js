import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const membersApi = createApi({
  reducerPath: 'membersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://evidenta-biserica.herokuapp.com/' }),
  tagTypes: ['members'],
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => `members/`,
      providesTags: ['members'],
    }),
    addMember: builder.mutation({
        query: (body) => ({
            url: 'members/',
            method: 'POST',
            body: body,
      }),
      invalidatesTags: ['members'],
    }),
    modifyMember: builder.mutation({
      query: (id) => ({
          url: `members/${id}`,
          method: 'PATCH',
      
    }),
    invalidatesTags: ['members'],
  }),
    delMember: builder.mutation({
        query: ({id}) => ({
            url: `members/${id}`,
            method: 'DELETE',
      }),
      invalidatesTags: ['members'],
    })
  }),
});

// Export hooks for usage in functional components
export const { useGetMembersQuery, useAddMemberMutation, useDelMemberMutation, useModifyMemberMutation } = membersApi;


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const membersApi = createApi({
  reducerPath: 'membersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://evidenta-biserica.herokuapp.com/' }),
  tagTypes: ['members', 'member'],
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => `members/`,
      providesTags: ['members'],
    }),
    getMember: builder.query({
      query: (id) => `members/${id}`,
      providesTags: ['member'],
    }),
    addMember: builder.mutation({
        query: (person) => ({
            url: 'members/',
            method: 'POST',
            body: person,
      }),
      invalidatesTags: ['members'],
    }),
    modifyMember: builder.mutation({
      query: (person) => ({
          url: `members/${person.id}`,
          method: 'PATCH',
          body: person
      
    }),
    invalidatesTags: ['members', 'member'],
  }),
    delMember: builder.mutation({
        query: (id) => ({
            url: `members/${id}`,
            method: 'DELETE',
      }),
      invalidatesTags: ['members'],
    })
  }),
});

// Export hooks for usage in functional components
export const {
  useGetMembersQuery,
  useGetMemberQuery,
  useAddMemberMutation,
  useDelMemberMutation,
  useModifyMemberMutation
} = membersApi;


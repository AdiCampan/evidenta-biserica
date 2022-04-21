import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const membersApi = createApi({
  reducerPath: 'membersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://evidenta-biserica.herokuapp.com/' }),
  tagTypes: [],
  endpoints: (builder) => ({
    getMembers: builder.query({
      query: () => `members/`,
    }),
    addMember: builder.mutation({
        query: (body) => ({
            url: 'members/',
            method: 'POST',
            body: body,
        }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { useGetMembersQuery, useAddMemberMutation } = membersApi;


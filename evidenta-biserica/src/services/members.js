import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../constants';

export const membersApi = createApi({
  reducerPath: 'membersApi',
  baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
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
      query: (person) => {
        const formData = new FormData();

        const { profileImage, ...personData } = person;
        formData.append('profileImage', profileImage);
        // send the rest of the documents as a stringified json
        // without it, it sends all items as strings
        formData.append('doc', JSON.stringify(personData));

        return {
          url: `members/${person.id}`,
          method: 'PATCH',
          body: formData
        }
      },
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


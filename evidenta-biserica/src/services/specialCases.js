import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../constants';

export const specialCasesApi = createApi({
    reducerPath: 'specialCasesApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
    tagTypes: ['specialCases', 'specialCase'],
    endpoints: (builder) => ({
      getSpecialCases: builder.query({
        query: () => `special-cases/`,
        providesTags: ['specialCases'],
      }),
      addSpecialCase: builder.mutation({
        query: (specialCase) => ({
            url: 'special-cases/',
            method: 'POST',
            body: specialCase,
          }),
          invalidatesTags: ['specialCases'], 
      })
    })
});

export const {
    useGetSpecialCasesQuery,
    useAddSpecialCaseMutation,
} = specialCasesApi;

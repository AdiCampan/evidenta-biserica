import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '../constants';

export const transfersApi = createApi({
    reducerPath: 'transfersApi',
    baseQuery: fetchBaseQuery({ baseUrl: SERVER_URL }),
    tagTypes: ['transfers', 'tranfer'],
    endpoints: (builder) => ({
      getTransfers: builder.query({
        query: () => `transfers/`,
        providesTags: ['transfers'],
      }),
      addTransfer: builder.mutation({
        query: (transfer) => ({
            url: 'transfers/',
            method: 'POST',
            body: transfer,
          }),
          invalidatesTags: ['transfers'], 
      }),
      delTransfer: builder.mutation({
        query: (id) => ({
          url: `transfers/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['transfers'],
      }),
    })
});

export const {
    useGetTransfersQuery,
    useAddTransferMutation,
    useDelTransferMutation,
} = transfersApi;

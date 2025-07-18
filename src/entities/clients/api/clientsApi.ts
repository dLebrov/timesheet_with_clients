import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/baseQuery';
import { ENDPOINT_URL } from '@/shared/lib';

import { TClientResponse, TCreateClientParams } from '../lib/types';

export const clientsApi = createApi({
  baseQuery,
  reducerPath: '@clients',
  tagTypes: ['clients'],
  endpoints: (build) => ({
    getClients: build.query<TClientResponse[], void>({
      query: () => ({
        url: `${ENDPOINT_URL}/clients`,
        method: 'GET',
      }),
      providesTags: ['clients'],
    }),
    createClient: build.mutation<void, TCreateClientParams>({
      query: (body) => ({
        url: `${ENDPOINT_URL}/clients`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['clients'],
    }),
  }),
});

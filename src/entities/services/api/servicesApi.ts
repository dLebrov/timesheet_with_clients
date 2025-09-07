import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/baseQuery';
import { ENDPOINT_URL } from '@/shared/lib';

import { TCreateService, TService } from '../lib/types';

export const serviceApi = createApi({
  baseQuery,
  reducerPath: '@services',
  tagTypes: ['services'],
  endpoints: (build) => ({
    getServices: build.query<TService[], void>({
      query: () => ({ url: `${ENDPOINT_URL}/services`, method: 'GET' }),
      providesTags: ['services'],
    }),
    createService: build.mutation<TService, TCreateService>({
      query: (body) => ({
        url: `${ENDPOINT_URL}/services`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['services'],
    }),
    deleteService: build.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINT_URL}/services/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['services'],
    }),
  }),
});

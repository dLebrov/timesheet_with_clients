import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/baseQuery';
import { ENDPOINT_URL } from '@/shared/lib';

import {
  TCreateRecordBody,
  TRecordResponse,
  TSearchRecordsQueryParams,
  TUpdateRecordParams,
} from '../lib/types';

export const recordsApi = createApi({
  baseQuery,
  reducerPath: '@records',
  tagTypes: ['records', 'record'],
  endpoints: (build) => ({
    getRecords: build.query<TRecordResponse[], void>({
      query: () => ({
        url: `${ENDPOINT_URL}/records`,
        method: 'GET',
      }),
      providesTags: ['records'],
    }),
    getRecord: build.query<TRecordResponse, number | null>({
      query: (id) => ({
        url: `${ENDPOINT_URL}/records/${id}`,
        method: 'GET',
        refetchOnMountOrArgChange: true,
      }),
      providesTags: ['record'],
    }),
    createRecord: build.mutation<TRecordResponse, TCreateRecordBody>({
      query: (body) => ({
        url: `${ENDPOINT_URL}/records`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['records'],
    }),
    updateRecord: build.mutation<TRecordResponse, TUpdateRecordParams>({
      query: ({ query, body }) => ({
        url: `${ENDPOINT_URL}/records/${query.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['records', 'record'],
    }),
    deleteRecord: build.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `${ENDPOINT_URL}/records/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['records'],
    }),
    searchRecordsByDateAndTime: build.query<TRecordResponse, TSearchRecordsQueryParams>({
      query: ({ date, startTime, endTime }) => ({
        url: `${ENDPOINT_URL}/records/search`,
        method: 'GET',
        params: { date, startTime, endTime },
      }),
    }),
  }),
});

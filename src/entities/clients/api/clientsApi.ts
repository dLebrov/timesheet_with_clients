import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/baseQuery';
import { ENDPOINT_URL } from '@/shared/lib';

import {
  TClientResponse,
  TCreateClientParams,
  TCreateClientSubjectParams,
  TCreateSubjectParams,
  TSubjectResponse,
  TUpdateClientParams,
} from '../lib/types';

export const clientsApi = createApi({
  baseQuery,
  reducerPath: '@clients',
  tagTypes: ['clients', 'subjects', 'client'],
  endpoints: (build) => ({
    getClients: build.query<TClientResponse[], void>({
      query: () => ({
        url: `${ENDPOINT_URL}/clients`,
        method: 'GET',
      }),
      providesTags: ['clients'],
    }),
    getClient: build.query<TClientResponse, number | null>({
      query: (id) => ({
        url: `${ENDPOINT_URL}/clients/${id}`,
        method: 'GET',
        refetchOnMountOrArgChange: true,
      }),
      providesTags: ['client'],
    }),
    createClient: build.mutation<TClientResponse, TCreateClientParams>({
      query: (body) => ({
        url: `${ENDPOINT_URL}/clients`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['clients'],
    }),
    updateClient: build.mutation<TClientResponse, TUpdateClientParams>({
      query: ({ query, body }) => ({
        url: `${ENDPOINT_URL}/clients/${query.id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['clients', 'client'],
    }),
    getSubjects: build.query<TSubjectResponse[], void>({
      query: () => ({
        url: `${ENDPOINT_URL}/subjects`,
        method: 'GET',
      }),
      providesTags: ['subjects'],
    }),
    createSubject: build.mutation<void, TCreateSubjectParams>({
      query: (body) => ({
        url: `${ENDPOINT_URL}/subjects`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['subjects'],
    }),
    deleteSubject: build.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINT_URL}/subjects/${id}/delete`,
        method: 'POST',
      }),
      invalidatesTags: ['subjects'],
    }),
    createClientSubject: build.mutation<void, TCreateClientSubjectParams>({
      query: (body) => ({
        url: `${ENDPOINT_URL}/client_subjects`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['clients', 'client'],
    }),
    deleteManyClientSubject: build.mutation<void, { ids: number[] }>({
      query: (body) => ({
        url: `${ENDPOINT_URL}/client_subjects/deleteMany`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQuery } from '@/shared/api/baseQuery';
import { ENDPOINT_URL } from '@/shared/lib';

import { TCreateSubjectParams, TSubjectResponse } from '../lib/types';

export const subjectApi = createApi({
  baseQuery,
  reducerPath: '@subjects',
  tagTypes: ['subjects'],
  endpoints: (build) => ({
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
        url: `${ENDPOINT_URL}/subjects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['subjects'],
    }),
  }),
});

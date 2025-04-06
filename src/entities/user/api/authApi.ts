import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ENDPOINT_URL } from '@/shared/lib';

import { TAuthParams, TAuthResponse } from '../lib/types';
import { setUser } from '../model/userSlice';

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  reducerPath: '@auth',
  tagTypes: ['auth'],
  endpoints: (build) => ({
    authUser: build.query<TAuthResponse, TAuthParams>({
      query: (body) => ({
        url: `${ENDPOINT_URL}/auth`,
        method: 'POST',
        body,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUser(data.user));
        } catch (error) {
          console.error('Ошибка аутентификации', error);
        }
      },
    }),
  }),
});

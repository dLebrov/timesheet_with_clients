import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ENDPOINT_URL } from '@/shared/lib';

import { TAuthResponse, TUserParams } from '../lib/types';
import { setUser } from '../model/userSlice';

export const userApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  reducerPath: '@user',
  tagTypes: ['user'],
  endpoints: (build) => ({
    createUser: build.query<TAuthResponse, TUserParams>({
      query: (body) => ({
        url: `${ENDPOINT_URL}/users`,
        method: 'POST',
        body,
      }),
      onQueryStarted: async (args, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;

          dispatch(setUser(data.user));
        } catch (error) {
          console.error('Ошибка создания пользователя', error);
        }
      },
    }),
  }),
});

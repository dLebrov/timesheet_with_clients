import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TAuthResponse } from '../lib/types';

interface UserState {
  user: TAuthResponse['user'] | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducerPath: 'user',
  reducers: {
    setUser: (state, action: PayloadAction<TAuthResponse['user'] | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

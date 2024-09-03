import { createSlice } from '@reduxjs/toolkit';

import { ThemeType } from '../lib';

export interface TInitialStateTheme {
  theme: ThemeType | null;
}

export const initialState: TInitialStateTheme = {
  theme: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const themeActions = {
  ...themeSlice.actions,
};

export default themeSlice;

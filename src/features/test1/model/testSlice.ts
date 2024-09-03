import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface TInitialState {
  user: boolean;
}

export const initialState: TInitialState = {
  user: false,
};

export const extraActions = {
  getAuth: createAsyncThunk('auth/getAuth', async (value: boolean) => {
    return value;
  }),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.user = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(extraActions.getAuth.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const userActions = {
  ...authSlice.actions,
  ...extraActions,
};

export default authSlice;

import { combineReducers } from '@reduxjs/toolkit';

import { clientsApi } from '@/entities/clients';
import { serviceApi } from '@/entities/services';
import { subjectApi } from '@/entities/subjects';
import themeReducer from '@/entities/theme/model/themeSlice';
import { authApi, userApi, userSlice } from '@/entities/user';
import authReducer from '@/features/test1/model/reducer';

export const mainReducer = combineReducers({
  test1: authReducer,
  theme: themeReducer.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [userSlice.reducerPath]: userSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [clientsApi.reducerPath]: clientsApi.reducer,
  [subjectApi.reducerPath]: subjectApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
});

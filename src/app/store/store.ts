import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { clientsApi } from '@/entities/clients';
import { serviceApi } from '@/entities/services';
import { subjectApi } from '@/entities/subjects';
import { authApi, userApi } from '@/entities/user';

import { mainReducer } from './reducer';

const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      authApi.middleware,
      userApi.middleware,
      clientsApi.middleware,
      subjectApi.middleware,
      serviceApi.middleware,
    ),
});

export type IRootState = ReturnType<typeof store.getState>;

export type IAppDispatch = typeof store.dispatch;
export type IAppThunk = ThunkAction<void, unknown, unknown, Action<string>>;

export const dispatch = store.dispatch;

export default store;

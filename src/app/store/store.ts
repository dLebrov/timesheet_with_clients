import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import { mainReducer } from './reducer';

const store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type IRootState = ReturnType<typeof store.getState>;

export type IAppDispatch = typeof store.dispatch;
export type IAppThunk = ThunkAction<void, unknown, unknown, Action<string>>;

export const dispatch = store.dispatch;

export default store;

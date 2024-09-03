import { combineReducers } from '@reduxjs/toolkit';

import themeReducer, { TInitialStateTheme } from '@/entities/theme/model/themeSlice';
import authReducer, { ITestReducer } from '@/features/test1/model/reducer';

export interface IState {
  test1: ITestReducer;
  theme: TInitialStateTheme;
}

export const mainReducer = combineReducers({
  test1: authReducer,
  theme: themeReducer.reducer,
});

import { combineReducers } from '@reduxjs/toolkit';

import authReducer, { ITestReducer } from '@/features/test1/model/reducer';

export interface IState {
  test1: ITestReducer;
}

export const mainReducer = combineReducers({
  test1: authReducer,
});

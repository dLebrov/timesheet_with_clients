import { combineReducers } from '@reduxjs/toolkit';

import testSlice, { TInitialState } from './testSlice';

export interface ITestReducer {
  testR: TInitialState;
}

const reducer = combineReducers({
  testR: testSlice.reducer,
});

export default reducer;

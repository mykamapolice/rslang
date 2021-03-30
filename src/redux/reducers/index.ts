import { combineReducers } from 'redux';
import userSlice from './user';
import vocabularySlice from './vocabulary'

export const rootReducer = combineReducers({
  user: userSlice,
  vocabulary:vocabularySlice
});

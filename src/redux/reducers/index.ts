import { combineReducers } from 'redux';
import userSlice from './user';
import statisticsSlice from './statistics';
import vocabularySlice from './vocabulary';

export const rootReducer = combineReducers({
  user: userSlice,
  statistics: statisticsSlice,
  vocabulary: vocabularySlice,
});

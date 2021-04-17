import { combineReducers } from 'redux';
import userSlice from './user';
import statisticsSlice from './statistics';
import vocabularySlice from './vocabulary';
import settingsSlice from './settings';

export const rootReducer = combineReducers({
	user: userSlice,
	statistics: statisticsSlice,
	vocabulary: vocabularySlice,
	settings: settingsSlice,
});

import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { IGeneralVocabulary, IWord } from '../../interfaces';
import {
	fetchingGeneralVocabulary,
	fetchingAggregatedWords,
	createUserWord,
	getUserWords,
	updateUserWord,
	fetchAllWords,
	bookStartFetching,
} from '../../utils/vocabulary-helper';

const initialState: IGeneralVocabulary = {
	vMode: false,
	page: 0,
	lvl: 0,
	words: null,
	userList: null,
	value: 0,
};

export const fetchingOnBookStart = createAsyncThunk(
	'vocabulary/fetchingOnBookStart',
	bookStartFetching
);
export const fetchingGeneral = createAsyncThunk(
	'vocabulary/fetching',
	fetchingGeneralVocabulary
);
export const fetchingAggregated = createAsyncThunk(
	'vocabulary/fetchingAggregated',
	fetchingAggregatedWords
);
export const createWord = createAsyncThunk(
	'vocabulary/createUser',
	createUserWord
);
export const getWords = createAsyncThunk(
	'vocabulary/getUserWords',
	getUserWords
);
export const updateWord = createAsyncThunk(
	'vocabulary/updateWord',
	updateUserWord
);
export const getAllWords = createAsyncThunk(
	'vocabulary/getAllWords',
	fetchAllWords
);

const vocabularySlice = createSlice({
	name: 'vocabulary',
	initialState,
	reducers: {
		vModeToggle: state => {
			const { vMode } = state;
			state.vMode = !vMode;
			state.page = 0;
		},
		vModeSetOff: state => {
			state.vMode = false;
			state.userList = null;
			state.lvl = 0;
			state.page = 0;
			state.value = 0;
		},
		setLvl: (state, action) => {
			state.lvl = action.payload.lvl;
			state.page = action.payload.page;
			state.words = null;
		},
		setPage: (state, action) => {
			state.page = action.payload;
			state.words = null;
		},
		setValue: (state, action) => {
			state.value = action.payload;
			state.page = 0;
		},
		clearWords: state => {
			state.words = null;
		},
		clearUserList: state => {
			state.userList = null;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchingOnBookStart.fulfilled, (state, action) => {
				state.words = [...action.payload.words];
				state.userList = [...action.payload.userList];
			})
			.addCase(fetchingGeneral.fulfilled, (state, action) => {
				state.words = [...action.payload];
			})
			.addCase(fetchingAggregated.fulfilled, (state, action) => {
				state.words = [...action.payload[0].paginatedResults];
			})
			.addCase(getAllWords.fulfilled, (state, action) => {
				state.words = [...action.payload[0].paginatedResults];
			})
			.addCase(createWord.fulfilled, (state, action) => {
				const { words, userList } = state;
				if (words) {
					try {
						const obj = words.findIndex(
							(el: IWord) => el._id === action.payload.wordId
						);
						words[obj].userWord = {
							optional: { ...action.payload.optional },
						};

						state.words = [...words];
						if (userList) state.userList = [...userList, words[obj]];
					} catch (error) {
						console.log(error);
					}
				}
			})
			.addCase(updateWord.fulfilled, (state, action) => {
				const stateCopy = current(state);
				console.log(action.payload);
				if (stateCopy.userList) {
					try {
						const userListCopy = stateCopy.userList.map(el => {
							if (el._id === action.payload.wordId) {
								return {
									...el,
									userWord: {
										...el.userWord,
										optional: action.payload.optional,
									},
								};
							} else return el;
						});
						state.userList = [...userListCopy];
					} catch (e) {
						console.log(e);
					}
				}
				if (stateCopy.words) {
					try {
						const wordsCopy = stateCopy.words.map(el => {
							if (el._id === action.payload.wordId) {
								return {
									...el,
									userWord: {
										...el.userWord,
										optional: action.payload.optional,
									},
								};
							} else return el;
						});
						state.words = [...wordsCopy];
					} catch (e) {
						console.log(e);
					}
				}
			})
			.addCase(getWords.fulfilled, (state, action) => {
				state.userList = [...action.payload[0].paginatedResults];
			});
	},
});

export const {
	setLvl,
	setPage,
	setValue,
	clearWords,
	clearUserList,
	vModeToggle,
	vModeSetOff,
} = vocabularySlice.actions;
export default vocabularySlice.reducer;

import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { IGeneralVocabulary,IWord } from '../../interfaces';
import { fetchingGeneralVocabulary, createUserWord, getUserWords, updateUserWord } from '../../utils/vocabulary-helper';

const initialState: IGeneralVocabulary = {
  page:0,
  lvl:0,
  words:null,
  userList:null
};

export const fetchingGeneral = createAsyncThunk('vocabulary/fetching', fetchingGeneralVocabulary);
export const createWord = createAsyncThunk('vocabulary/createUser', createUserWord);
export const getWords = createAsyncThunk('vocabulary/getUserWords', getUserWords);
export const updateWord = createAsyncThunk('vocabulary/updateWord', updateUserWord);

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers:{
    setLvl:(state, action) => ({
      ...state,
      lvl: action.payload,
    }),

    setPage:(state, action) => ({
      ...state,
      page: action.payload,
    }),
    clearWords: (state) => ({
      ...state,
      words: null
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchingGeneral.fulfilled, (state, action) => {
        state.words = [...action.payload];
      })
      .addCase(createWord.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(updateWord.fulfilled,(state, action)=>{
        const userList = current(state).userList;
        if(userList){
            const stateCopy = userList.map(el => {
              if(el._id === action.payload.wordId) {
                return {...el, userWord:{...el.userWord,difficulty:action.payload.difficulty}}
              }
              else
              return el;
          
      })
      state.userList = [...stateCopy];
    }
      })
      .addCase(getWords.fulfilled, (state,action) => {
        console.log(action.payload[0].paginatedResults);
        state.userList = [...action.payload[0].paginatedResults];
      })
}});

export const { setLvl, setPage, clearWords } = vocabularySlice.actions;
export default vocabularySlice.reducer;

import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { IGeneralVocabulary } from '../../interfaces';
import { fetchingGeneralVocabulary } from '../../utils/vocabulary-helper';

const initialState: IGeneralVocabulary = {
  page:0,
  lvl:0,
  words:null
};

export const fetchingGeneral = createAsyncThunk('vocabulary/fetching', fetchingGeneralVocabulary);

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
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchingGeneral.fulfilled, (state, action) => {
        state.words = action.payload.words;
      })

}});

export const { setLvl, setPage } = vocabularySlice.actions;
export default vocabularySlice.reducer;

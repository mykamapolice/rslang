import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IStatistics } from '../../interfaces';
import {
  fetchStatistics,
  upsertStatistics,
} from '../../utils/statistics-helper';

const initialState: IStatistics = {
  learnedWords: 0,
  optional: {
    games: {},
  },
};

export const getStatistics = createAsyncThunk(
  'statistics/fetch',
  fetchStatistics
);

export const updateStatistics = createAsyncThunk(
  'statistics/update',
  upsertStatistics
);

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    changeActionStat: (state, action) => {
      console.log('changeActionStat', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.fulfilled, (state, action) => {
        const { learnedWords, optional } = action.payload;

        state.learnedWords = learnedWords;
        state.optional = optional;
      })

      .addCase(updateStatistics.fulfilled, (state, action) => {
        console.log('extra update');
      });
  },
});

export const { changeActionStat } = statisticsSlice.actions;
export default statisticsSlice.reducer;

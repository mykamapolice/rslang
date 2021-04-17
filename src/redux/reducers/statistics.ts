import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IStatistics, IGameResult } from '../../interfaces';
import {
  fetchStatistics,
  upsertStatistics,
} from '../../utils/statistics-helper';

const initialState: IStatistics = {
  learnedWords: 0,
  optional: {
    games: {
      savannah: [],

      audiocall: [],

      sprint: [],

      owngame: [],
    },
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
    update: (state, action) => {
      const { game, result }: IGameResult = action.payload;
      const currentGameStat = state.optional.games[game];

      state.learnedWords += result.learnedWords;

      if (!currentGameStat.length) {
        state.optional.games[game].push(result);
      } else if (currentGameStat[0].date < result.date) {
        state.optional.games[game] = [result, ...currentGameStat];
      } else {
        currentGameStat[0].attempts += result.attempts;
        currentGameStat[0].rightAnswers += result.rightAnswers;
        currentGameStat[0].learnedWords += result.learnedWords;

        if (currentGameStat[0].bestSeries < result.bestSeries) {
          currentGameStat[0].bestSeries = result.bestSeries;
        }

        state.optional.games[game] = currentGameStat;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getStatistics.fulfilled, (state, action) => {
      const response = action.payload;
      console.log(action.payload)
      if (response.status === 200) {
        const { learnedWords, optional } = action.payload.data;
        state.learnedWords = learnedWords;
        state.optional = optional;
      }
    });
  },
});

export const { update } = statisticsSlice.actions;
export default statisticsSlice.reducer;

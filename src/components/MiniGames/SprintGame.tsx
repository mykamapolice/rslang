import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { IGameResult, IRootState } from '../../interfaces';
import { getStatistics, updateStatistics } from './../../redux/reducers/statistics';

const gameStatistics: IGameResult = {
  game: 'savannah',
  result: {
    date: 2,
    bestSeries: 1,
    attempts: 10,
    rightAnswers: 3,
    learnedWords: 9,
  },
};

export const SprintGame = () => {

  const dispatch = useDispatch();
  const statistics = useSelector((state: IRootState) => state.statistics);

  const getCurrentStateHandler = () => {

    console.log(statistics);
  };

  const getStatisticsHandler = () => {
    dispatch(getStatistics());
  };

  const updateStatisticsHandler = () => {
    dispatch(updateStatistics(gameStatistics));
  };

  return (
    <div>
      <h1>SprintGame</h1>
      <Button variant="primary" onClick={getStatisticsHandler}>
        GetStatistics
      </Button>

      <Button variant="primary" onClick={updateStatisticsHandler}>
        UpdateStatistics
      </Button>

      <Button variant="warning" onClick={getCurrentStateHandler}>
        GetState
      </Button>
    </div>
  );
};

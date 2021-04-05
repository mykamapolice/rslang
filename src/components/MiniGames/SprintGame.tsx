import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../interfaces';
import { getStatistics, updateStatistics } from './../../redux/reducers/statistics';

const gameStatistics = {
  game: 'Sprint',
  result: {
    date: 12315612316456564,
    bestSeries: 19,
    attempts: 55,
    rightAnswers: 49,
    learnedWords: 120,
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

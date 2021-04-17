import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import LongTermStatistics from './LongTermStatistics/LongTerm';
import ShortTermStatistics from './ShortTermStatistics/ShortTerm';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../interfaces';
import { getStatistics } from '../../redux/reducers/statistics';

function Statistics(props: any): JSX.Element {

  const [longTermStat, setLongTermStat] = useState(false);
  const [allStatistics, setAllStatistics]: any = useState()

  function onClickHandler(par: boolean) {
    setLongTermStat(par);
  }

  const dispatch = useDispatch();
  const statistics = useSelector((state: IRootState) => state.statistics);

  useEffect(() => {
    dispatch(getStatistics());
  }, []);

  useEffect(() => {
    setAllStatistics(statistics)
  }, [statistics]);

  return (
    <div>
      <div style={{ margin: '1rem' }}>
        <Button
          onClick={() => onClickHandler(true)}
          variant='primary'
          size='lg'
          active
        >
          Долгосрочная статистика
        </Button>
        {'   '}
        <Button
          onClick={() => onClickHandler(false)}
          variant='primary'
          size='lg'
          active
        >
          Краткосрочная статистика
        </Button>
      </div>
      <div>
        {longTermStat ? (
          <LongTermStatistics allStatistics={allStatistics} />
        ) : (
          <ShortTermStatistics />
        )}
      </div>
    </div>
  );
}

export default Statistics;

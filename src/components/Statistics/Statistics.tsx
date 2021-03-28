import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import LongTermStatistics from './LongTermStatistics/LongTerm';
import ShortTermStatistics from './ShortTermStatistics/ShortTerm';

function Statistics(): JSX.Element {
  const [longTermStat, setLongTermStat] = useState(false);

  function onClickHandler(par: boolean) {
    setLongTermStat(par);
  }

  return (
    <div>
      <div style={{ margin: '1rem' }}>
        <Button
          onClick={() => onClickHandler(true)}
          variant="primary"
          size="lg"
          active
        >
          Долгосрочная статистика
                </Button>
        {'   '}
        <Button
          onClick={() => onClickHandler(false)}
          variant="primary"
          size="lg"
          active
        >
          Краткосрочная статистика
                </Button>
      </div>
      <div>
        {longTermStat ? (
          <LongTermStatistics />
        ) : (
          <ShortTermStatistics />
        )}
      </div>
    </div>
  );
}

export default Statistics;

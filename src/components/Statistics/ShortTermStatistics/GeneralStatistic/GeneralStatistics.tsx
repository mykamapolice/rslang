import React from 'react';
import { BookHalf, Percent } from 'react-bootstrap-icons';

const GeneralStatistic = (): JSX.Element => {
  return (
    <div>
      <div>
        <h4>
          Общее количество изученых слов
          {' '}
          <BookHalf />
        </h4>
        <p style={{
          color: 'orange',
          fontSize: '2rem',
        }}>24</p>
      </div>
      <div>
        <h4>
          Процент правильных ответов
          {' '}
          <Percent />
          <p style={{
            color: 'green',
            fontSize: '2rem',
          }}>34</p>
        </h4>
      </div>
    </div>
  );
};

export default GeneralStatistic;

import React from 'react';
import { BookHalf, Percent } from 'react-bootstrap-icons';

const GeneralStatistic = (): JSX.Element => {
  let a;
  return (
        <div>
            <div>
                <h4>
                    Общее количество изученых слов
{' '}
<BookHalf />
                </h4>
                <h3 style={{ color: 'orange' }}>24</h3>
            </div>
            <div>
                <h4>
                    Процент правильных ответов
{' '}
<Percent />
                    <h3 style={{ color: 'green' }}>34</h3>
                </h4>
            </div>
        </div>
  );
};

export default GeneralStatistic;

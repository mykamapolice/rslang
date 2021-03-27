import React from 'react';
import { Table } from 'react-bootstrap';
import { Binoculars, BookHalf, Percent } from 'react-bootstrap-icons';

const ShortTermStatisticsItem = (props: any) => (
    <div>
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>
                        <span>
                            Количество изученных слов
{' '}
<BookHalf />
                        </span>
                    </th>
                    <th>
                        Процент правильных ответов
{' '}
<Percent />
                    </th>
                    <th>
                        Самая длинная серия
{' '}
<Binoculars />
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Процент правильных ответов</td>
                    <td>Mark</td>
                    <td>Otto</td>
                </tr>
            </tbody>
        </Table>
    </div>
);

export default ShortTermStatisticsItem;

import React, { useEffect, useState } from 'react';
import {
  Accordion, Button, Card, Table,
} from 'react-bootstrap';
import StatItem from './StatItem/StatItem';
import GeneralStatistic from './GeneralStatistic/GeneralStatistics';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../interfaces';

const ShortTermStatistics = () => {


  const [swojaIgraStat, setSwojaIgraStat]= useState({
    bestSeries: 0,
    correct: 0
  });
  const [sprintStat, setSprintStat] = useState({
    bestSeries: 0,
    correct: 0
  });
  const [savannahStat, setSavannahStat] = useState({
    bestSeries: 0,
    correct: 0
  });
  const [audiocallStat, setAudiocallStat]= useState({
    bestSeries: 0,
    correct: 0
  })
  const [general, setGeneral] = useState(0);
  const [percentOfCorrect, setPercentOfCorrect] = useState(0);
  const [correct, setCorrect] = useState(0);

  const statistics = useSelector((state: IRootState) => state.statistics);

  useEffect(() => {
    if (statistics) {
      setCorrect(0)
      const gamesObj = statistics.optional.games
      for (let key in gamesObj) {
        setStatisticsToGame(gamesObj[key], key)
        gamesObj[key].map((item: any) => {
          setCorrect((prev: number) => prev + item.rightAnswers)
        });
      }
      setGeneral(statistics.learnedWords);
    }
  }, [statistics]);

  useEffect(() => {
    const poc = Math.ceil(correct / general * 100)
    if (poc) {
      setPercentOfCorrect(poc);
    }
  }, [correct]);


  const setStatisticsToGame = (item: any, key: any) => {
    item.map((game: any) => {
      const correct = Math.ceil(game.rightAnswers / game.learnedWords * 100)
      const bestSeries = game.bestSeries
      switch (key) {
        case `savannah`:
          console.log(key, (Math.ceil(game.rightAnswers / game.learnedWords * 100)))
          setSavannahStat( {
              bestSeries: bestSeries,
              correct: correct
            })
          break
        case `audiocall`:
          console.log(key, (Math.ceil(game.rightAnswers / game.learnedWords * 100)))
          setAudiocallStat( {
            bestSeries: bestSeries,
            correct: correct
          })
          break
        case `owngame`:
          console.log(key, (Math.ceil(game.rightAnswers / game.learnedWords * 100)))
          setSwojaIgraStat( {
            bestSeries: bestSeries,
            correct: correct
          })
          break
        case `sprint`:
          console.log(key, (Math.ceil(game.rightAnswers / game.learnedWords * 100)))
          setSprintStat( {
            bestSeries: bestSeries,
            correct: correct
          })
          break
      }
    })
  }

  return (<div>
    <Accordion defaultActiveKey='0'>
      <Card
        style={{
          margin: '0 auto',
          width: '100%',
        }}
      >
        <Card.Header>
          <Accordion.Toggle as={Button} variant='link' eventKey='0'>
            Общая статистика за день
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <GeneralStatistic general={general}
                              percentOfCorrect={percentOfCorrect} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card
        style={{
          margin: '0 auto',
          width: '100%',
        }}
      >
        <Card.Header>
          <Accordion.Toggle as={Button} variant='link' eventKey='1'>
            Саванна
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='1'>
          <Card.Body>
            <StatItem stat={savannahStat}/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card
        style={{
          margin: '0 auto',
          width: '100%',
        }}
      >
        <Card.Header>
          <Accordion.Toggle as={Button} variant='link' eventKey='2'>
            Аудиовызов
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='2'>
          <Card.Body>
            <StatItem stat={audiocallStat}/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card
        style={{
          margin: '0 auto',
          width: '100%',
        }}
      >
        <Card.Header>
          <Accordion.Toggle as={Button} variant='link' eventKey='3'>
            Спринт
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='3'>
          <Card.Body>
            <StatItem stat={sprintStat}/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card
        style={{
          margin: '0 auto',
          width: '100%',
        }}
      >
        <Card.Header>
          <Accordion.Toggle as={Button} variant='link' eventKey='4'>
            Своя игра
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey='4'>
          <Card.Body>
            <StatItem stat={swojaIgraStat}/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  </div>);
};

export default ShortTermStatistics;

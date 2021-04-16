import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import './SprintGame.css';

export const SprintGame = (props: any) => {
  const { questionsNumbers, score, setScore, questions, showFinishInfo } = props;

  const [questionNumber, setQuestionNumber] = useState(0);

  const question = questions[questionNumber];
  const { correct, answers } = question;
  const variant = answers[Math.floor(Math.random() * 4)];

  const validateAnswer = useCallback(
    (bool: boolean) => {

      if (variant.isCorrect === bool) {
        setScore((prev: any) => prev + 1);
      }

      if (questionNumber === questionsNumbers - 1) {
        showFinishInfo();
      }

      setQuestionNumber(prev => prev + 1);
    },
    [variant, setScore, questionNumber, questionsNumbers, showFinishInfo, setQuestionNumber],
  );

  return (
    <div className='sprint-game'>
      <h1>
        Номер вопроса: {questionNumber + 1} / {questionsNumbers}
      </h1>
      <h2>Количество правильных ответов: {score}</h2>
      <h3>{correct} - {variant.wordTranslate}</h3>

      <Button variant="outline-success" onClick={() => validateAnswer(true)}>Верно</Button>
      <Button variant="outline-danger" onClick={() => validateAnswer(false)}>Не верно</Button>

    </div>
  );
};

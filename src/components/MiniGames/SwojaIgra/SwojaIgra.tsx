import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchingGeneral,
  setLvl,
} from '../../../redux/reducers/vocabulary';
import Lvl from '../../Learning/Lvl/Lvl';
import QuestionBox from './QuestionBox/QuestionBox';
import Rules from './RulesOfSwojaIgra/RulesOfSwojaIgra';

const SwojaIgra: FC = (): JSX.Element => {

  const [isStarted, setStarted] = useState(false);
  const [isFinish, setFinish] = useState(true);
  const [questions, setQuestions]: any[] = useState([]);
  const [questionsNumbers, setQuestionsNumbers] = useState(10);
  const usedQuestions: any[] = [];

  const dispatch = useDispatch();
  const levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const state: any = useSelector(state => state);
  const { vocabulary: { lvl, words } } = state;

  const wordsCopy = words;

  useEffect(() => {
    const page = Math.floor(Math.random() * (30));
    const baseUrl: string = 'https://rs-lang-rs-team-41.herokuapp.com/';
    dispatch(fetchingGeneral(`${baseUrl}words?page=${page}&group=${lvl}`));
  }, [questions]);

  const getIncorrectWords = (correctWord: string) => {
    const arrayOfIncorrect: any[] = [];
    const wordsToCheck: any[] = [];


    while (arrayOfIncorrect.length !== 3) {
      const randomQuestionNumber: number = Math.floor(Math.random() * (20));
      const { word } = wordsCopy[randomQuestionNumber];

      if (word !== correctWord && !wordsToCheck.includes(word)) {
        arrayOfIncorrect.push({ word, isCorrect: false });
        wordsToCheck.push(word);
      }

    }
    return arrayOfIncorrect;
  };

  const addNewQuestionToArray = () => {

    const randomQuestionNumber: number = Math.floor(Math.random() * (20));
    const { image, word } = wordsCopy[randomQuestionNumber];

    if (!usedQuestions.includes(randomQuestionNumber)) {
      usedQuestions.push(randomQuestionNumber);

      let answers: any[] = getIncorrectWords(word);
      answers.push({ word, isCorrect: true });
      answers = answers.sort(() => Math.random() - 0.5);

      const newQuestion = {
        image,
        answers,
        correct: word
      };
      return newQuestion;
    }
  };

  const getQuestions = () => {
    const questionsCopy = [];
    while (questionsCopy.length !== questionsNumbers) {
      const question = addNewQuestionToArray();
      if (question !== undefined) {
        questionsCopy.push(question);
      }
    }
    setQuestions(questionsCopy);
    setStarted(true);
    return questionsCopy;
  };

  return (
    <div className='Vocabulary'>
      {isStarted ? <QuestionBox setStarted={setStarted} questions={questions} /> :
        <>
          <h2 className="fs-3">Выберите сложность слов:</h2>
          <div className='container-fluid'>
            <div className='d-sm-flex p-2 flex-wrap justify-content-center'>
              <Lvl levels={levels} lvl={lvl}
                setLvl={(n: number) => dispatch(setLvl(n))} />
            </div>
          </div>
          <Rules />
          <button onClick={getQuestions} type="button" className="btn btn-outline-success">Нажмите чтобы начать игру :)
          </button>
        </>
      }
    </div>
  );
};

export default SwojaIgra;

import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllWords,
  setLvl,
} from '../../../redux/reducers/vocabulary';
import QuestionBox from './QuestionBox/QuestionBox';
import Rules from './RulesOfSwojaIgra/RulesOfSwojaIgra';
import {
  Alert, ToggleButton, ToggleButtonGroup,
} from 'react-bootstrap';
import SwojaIgraStat from './EndGameStatistic/SwojaIgraStat';
import styles from './SwojaIgra.module.css'

const SwojaIgra: FC = (): JSX.Element => {

  const [isStarted, setStarted] = useState(false)
  const [finish, setFinish] = useState(false)
  const [questions, setQuestions]: any[] = useState([])
  const [questionsNumbers, setQuestionsNumbers] = useState(20)
  const [lvl, setLvl] = useState(0)
  const usedQuestions: any[] = []

  const dispatch = useDispatch();
  const state: any = useSelector(state => state);

  const isLogin = state.user.isAuth
  const token = state.user.token
  const userId = state.user.userId
  const {vocabulary:{ words } } = state;

  const wordsCopy = words

  useEffect( () => {
    dispatch(getAllWords({userId, token, lvl}));
    console.log(questions)
  }, [isStarted])

  const showFinishInfo = () => {
    setFinish(true)
    setStarted(false)
    setTimeout(() => setFinish(false), 5000)
  }

  const setQuestionNumbers = (val: number) => setQuestionsNumbers(val);
  const setLevel = (val: number) => setLvl(val);

  const getIncorrectWords = (correctWord: string) => {
    const arrayOfIncorrect: any[] = []
    const wordsToCheck: any[] = []


    while (arrayOfIncorrect.length !== 3) {
      const randomQuestionNumber: number = Math.floor(Math.random()  * (600));
      const { word, wordTranslate } = wordsCopy[randomQuestionNumber]

      if(word !== correctWord && !wordsToCheck.includes(word)) {
        arrayOfIncorrect.push({ word, isCorrect: false, wordTranslate})
        wordsToCheck.push(word)
      }

    }
    return arrayOfIncorrect
  }

  const addNewQuestionToArray = () => {

      const randomQuestionNumber: number = Math.floor(Math.random()  * (600));
      console.log(wordsCopy)
      const {image,
        word,
        audio,
        wordTranslate } = wordsCopy[randomQuestionNumber]

        console.log(audio, wordTranslate)

      if(!usedQuestions.includes(randomQuestionNumber)) {
        usedQuestions.push(randomQuestionNumber)

        let answers: any[] = getIncorrectWords(word)
        answers.push({ word , isCorrect: true, wordTranslate})
        answers = answers.sort(() => Math.random() - 0.5)

        const newQuestion = {
          image,
          answers,
          correct: word,
          audio,
        }
        return newQuestion
    }
  }

  const getQuestions = () => {
    const questionsCopy = []
    while(questionsCopy.length !== questionsNumbers) {
      const question = addNewQuestionToArray()
      if(question !== undefined) {
        questionsCopy.push(question)
      }
    }
    return questionsCopy
  }

  const useQuestions = () => {
    setQuestions(getQuestions())
    setStarted(true)
  }

  return (
    <div className='Vocabulary'>
      {finish ? <SwojaIgraStat /> :
        !isLogin ?
        <Alert variant="danger">
          <Alert.Heading>Пожалуйста авторизируйтесь</Alert.Heading>
        </Alert>
        : isStarted ? <QuestionBox
            questionsNumbers={questionsNumbers}
            setStarted={setStarted}
            questions={questions}
            showFinishInfo={showFinishInfo}
          /> :
        <>
          <div className={styles.SwojaIgraContainer}>
          <h2 className="fs-3">Выберите уровень слов:</h2>
            <ToggleButtonGroup type="radio" name="options" value={lvl} onChange={setLevel}>
              <ToggleButton value={0}>1</ToggleButton>
              <ToggleButton value={1}>2</ToggleButton>
              <ToggleButton value={2}>3</ToggleButton>
              <ToggleButton value={3}>4</ToggleButton>
              <ToggleButton value={4}>5</ToggleButton>
              <ToggleButton value={5}>6</ToggleButton>
            </ToggleButtonGroup>
          <h2>Выберите количество вопросов:</h2>
            <ToggleButtonGroup type="radio" name="options" value={questionsNumbers} onChange={setQuestionNumbers}>
              <ToggleButton value={5}>5</ToggleButton>
              <ToggleButton value={10}>10</ToggleButton>
              <ToggleButton value={15}>15</ToggleButton>
              <ToggleButton value={20}>20</ToggleButton>
            </ToggleButtonGroup>
            <Rules />

            <button onClick={useQuestions} type="button" className="btn btn-outline-success btn-lg">Нажмите чтобы начать игру :)
            </button>
          </div>
        </>
      }
    </div>
  )
}

export default SwojaIgra

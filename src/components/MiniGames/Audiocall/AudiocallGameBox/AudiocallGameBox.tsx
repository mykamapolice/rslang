import React, { useEffect, useState } from 'react';
import 'react-slideshow-image/dist/styles.css';
// @ts-ignore
import { Slide } from 'react-slideshow-image';
import { ArrowRight, VolumeUp } from 'react-bootstrap-icons';
import styles from './AudioncallGameBox.module.css';
import AudioCallGameCard from '../AudioCallGameCard/AudioCallGameCard';
import { baseUrl } from '../../../../utils/constants';

const AudiocallGameBox = (props: any) => {

  const [questionNumber, setQuestionNumber] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [correct, setCorrect] = useState('');
  const [isShowAnswer, setIsShowAnswer] = useState(false)
  const [nextBtnDis, setNextBtnDis] = useState(true)
  const [IsShowEndInfo, setIsShowEndInfo] = useState(false);

  const {
    questionsNumbers,
    setStarted,
    questions,
    showFinishInfo,
    setScore,
    score,
    sendWordStats
  } = props;

  useEffect(() => {
    if (questionNumber !== questionsNumbers) {
      audioHandler()

    } else {
      showFinishInfo();
      setIsShowEndInfo(true)
    }

    if (questions[questionNumber] !== undefined) {
      setImageUrl(questions[questionNumber].image)
      setCorrect(questions[questionNumber].correct)
    }

  }, [questionNumber]);

  const slideRef: any = React.createRef();
  const audio: HTMLAudioElement = new Audio();

  function next() {
    setQuestionNumber(questionNumber + 1)
    setIsShowAnswer(false)
    setNextBtnDis(true)
    slideRef.current.goNext()
  }

  const audioHandler = (): void => {
    if(audio !== undefined) {
      audio.src = `${baseUrl}${questions[questionNumber].audio}`;
      audio.play();
    }
  };

  const handleClose = () => setIsShowEndInfo(false);

  const properties = {
    duration: 5000,
    autoplay: false,
    transitionDuration: 500,
    arrows: false,
    infinite: false,
    easing: 'ease',
    canSwipe: false
    // indicators: (i: any) => <div className="indicator">{i + 1}</div>
  };

  const cards = questions.map((item: any) => {
    return <AudioCallGameCard
      sendWordStats = {sendWordStats}
      audioHandler={audioHandler}
      questions = {questions}
      questionNumber={questionNumber}
      setQuestionNumber={setQuestionNumber}
      answers={item.answers}
      setIsShowAnswer={setIsShowAnswer}
      setScore={setScore}
      score={score}
      setNextBtnDis={setNextBtnDis}
      setIsShowEndInfo={setIsShowEndInfo}

    />;
  });

  return (
    <div className={styles.gamebox}>
      <h2>Аудиовызов</h2>
      <h3>Номер вопроса {questionNumber + 1}/{questionsNumbers}</h3>
      <h3>Количество праильных ответов: {score}</h3>
      <div className='slide-container'>
        {isShowAnswer ? <div className={styles.answerContainer}>
          <img src={`${baseUrl}${imageUrl}`} alt='' />
          <h4>{correct}</h4>
        </div>
          : <div className={styles.answerContainer}>
            <img src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAXFIofSlA8JRrMexPVZLNawi8nfIFcLPs8A&usqp=CAU`} alt='' />
            <h4>????</h4>
          </div>}
        <Slide ref={slideRef} {...properties}>
            {cards}
        </Slide>
        <button disabled={nextBtnDis} onClick={next} type='button'
                className={styles.nextBtn}>
          < ArrowRight size={96} />
        </button>
      </div>
    </div>
  );
};

export default AudiocallGameBox;

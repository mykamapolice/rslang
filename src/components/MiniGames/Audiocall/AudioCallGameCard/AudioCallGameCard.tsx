import React, { useState } from 'react';
import { VolumeUp } from 'react-bootstrap-icons';
import styles from './AudioCallGameCard.module.css'

const buttons = []

const AudioCallGameCard = (props: any) => {

  const [ser, setSer] = useState(0)

  const {
    audioHandler,
    answers,
    setIsShowAnswer,
    setScore,
    score,
    setNextBtnDis,
    setIsShowEndInfo,
    sendWordStats,
    questions,
    questionNumber,
    longestSeries,
    setLongestSeries
    } = props

  const [btnDisabled, setBtnDisabled] = useState(false)

  const translations = answers.map((item: {wordTranslate: string }) => item.wordTranslate)


  const buttonClickHandler = (e: any) => {
    const word = e.target.closest("button").children[1].innerHTML
    const ans: any = checkAnswer(word)
    if( ans.isCorrect ) {
      setScore(score + 1);
      setSer((prev: number) => prev + 1)
      if(longestSeries <= ser) {
        setLongestSeries(ser)
      }
    } else {
      setSer(0)
    }
    sendWordStats(questions[questionNumber],ans.isCorrect)
    setBtnDisabled(true)
    setIsShowAnswer(true)
  }

  const checkAnswer = (word: string) => {
    let ans;
    answers.map((item: any) => {
      if(item.wordTranslate === word) {
        ans =  item
      }
    })
    setNextBtnDis(false)
    return ans;
  }

  return (
    <div className="each-fade">
      <div className={styles.gameboxContent}>
        <button ><VolumeUp size={96} onClick={audioHandler}/></button>
        <div className={styles.questionsContainer}>
          <button disabled={btnDisabled} onClick={buttonClickHandler}><p>a</p><a>{translations[0]}</a></button>
          <button disabled={btnDisabled} onClick={buttonClickHandler}><p>b</p><a>{translations[1]}</a></button>
          <button disabled={btnDisabled} onClick={buttonClickHandler}><p>c</p><a>{translations[2]}</a></button>
          <button disabled={btnDisabled} onClick={buttonClickHandler}><p>d</p><a>{translations[3]}</a></button>
        </div>
      </div>
    </div>
  )
}

export default AudioCallGameCard

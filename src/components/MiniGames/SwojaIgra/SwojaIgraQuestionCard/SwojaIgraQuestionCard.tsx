import React, { useEffect, useRef, useState } from 'react';

const QuestionCard = (props: any) => {

  const baseUrl: string = 'https://rs-lang-rs-team-41.herokuapp.com/';

  const [btnDisabled, setBtnDisabled] = useState(false)

  const setKey = (event: any) => {
    try {
      if (event.key !== ' ') {
        const btn: any = document.querySelector(`#${event.key}`);
        if (btn !== null) {
          btn.click();
        }
      }
      if (event.key === ' ') {
        const space: any  = document.querySelector('#next');
        if (space !== null) {
          space.click()
        }
      }
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', setKey);
    return () => {
      window.removeEventListener('keydown', setKey);
    };
  }, []);

  const nextButtonClickHandler = (e: any) => {
    props.setQuestionNumber(props.questionNumber + 1)
    setBtnDisabled(false)
  }

  const buttonClickHandler = (e: any) => {
    const word = e.target.innerHTML.split(' ')[1]
    const ans: any = checkAnswer(word)
    if( ans.isCorrect ) {
      props.setScore(props.score + 1)
    }
    props.sendWordStats(props.questions[props.questionNumber],ans.isCorrect)
    setBtnDisabled(true)
  }

  const checkAnswer = (word: string) => {
    let ans;

    props.answers.map((item: any) => {
      if(item.word === word) {
        ans =  item
      }
    })

    return ans;
  }

  return (
    <div className="card" style={{ width: '18rem', margin: "0 auto" }}>
      <img src={`${baseUrl}${props.image}`} alt='[eq' />
        <div className="card-body" >
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <button
              id='a'
              type="button"
              style={{ width: '100%' }}
              className="btn btn-outline-warning"
              disabled = {btnDisabled}
              onClick={buttonClickHandler}
            >
              {`a ${props.answers[0].word}`}
            </button>
          </li>
          <li className="list-group-item">
            <button
              id='b'
              type="button"
              style={{ width: '100%' }}
              className="btn btn-outline-warning"
              disabled = {btnDisabled}
              onClick={buttonClickHandler}
            >
              {`b ${props.answers[1].word}`}
            </button>
          </li>
          <li className="list-group-item">
            <button
              id='c'
              type="button"
              style={{ width: '100%' }}
              className="btn btn-outline-warning"
              disabled = {btnDisabled}
              onClick={buttonClickHandler}
            >
              {`c ${props.answers[2].word}`}
            </button>
          </li>
          <li className="list-group-item">
            <button
              id='d'
              type="button"
              style={{ width: '100%' }}
              className="btn btn-outline-warning"
              disabled = {btnDisabled}
              onClick={buttonClickHandler}
            >
              {`d ${props.answers[3].word}`}
            </button>
          </li>
          {btnDisabled && <button
            id="next"
            type="button"
            className="btn btn-info"
            onClick={nextButtonClickHandler}
          >
            Следующее слово (Space)
          </button>}
        </ul>
        </div>
    </div>
  )
}

export default QuestionCard

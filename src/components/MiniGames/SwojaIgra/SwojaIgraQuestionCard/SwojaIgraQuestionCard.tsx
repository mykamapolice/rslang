import React, { useState } from 'react';

const QuestionCard = (props: any) => {

  const baseUrl: string = 'https://rs-lang-rs-team-41.herokuapp.com/';

  const [btnDisabled, setBtnDisabled] = useState(false)

  const nextButtonClickHandler = () => {
    props.setQuestionNumber(props.questionNumber + 1)
    setBtnDisabled(false)
  }

  const buttonClickHandler = () => {
    setBtnDisabled(true)
  }

  return (
    <div className="card" style={{ width: '18rem', margin: "0 auto" }}>
      <img src={`${baseUrl}${props.image}`} alt='[eq' />
        <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <button
              type="button"
              style={{ width: '100%' }}
              className="btn btn-primary"
              disabled = {btnDisabled}
              onClick={buttonClickHandler}
            >
              {props.answers[0].word}
            </button>
          </li>
          <li className="list-group-item">
            <button
              type="button"
              style={{ width: '100%' }}
              className="btn btn-primary"
              disabled = {btnDisabled}
              onClick={buttonClickHandler}
            >
              {props.answers[1].word}
            </button>
          </li>
          <li className="list-group-item">
            <button
              type="button"
              style={{ width: '100%' }}
              className="btn btn-primary"
              disabled = {btnDisabled}
              onClick={buttonClickHandler}
            >
              {props.answers[2].word}
            </button>
          </li>
          <li className="list-group-item">
            <button
              type="button"
              style={{ width: '100%' }}
              className="btn btn-primary"
              disabled = {btnDisabled}
              onClick={buttonClickHandler}
            >
              {props.answers[3].word}
            </button>
          </li>
          {btnDisabled && <button onClick={nextButtonClickHandler}>Next Question</button>}
        </ul>
        </div>
    </div>
  )
}

export default QuestionCard

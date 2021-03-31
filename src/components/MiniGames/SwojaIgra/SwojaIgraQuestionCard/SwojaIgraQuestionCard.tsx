import React from 'react';

const QuestionCard = (props: any) => {
  const baseUrl: string = 'https://rs-lang-rs-team-41.herokuapp.com/';
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={`${baseUrl}${props.image}`} alt='[eq' />
        <div className="card-body">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <button type="button" style={{ width: '100%' }} className="btn btn-primary">{props.answers[0].word}</button>
          </li>
          <li className="list-group-item">
            <button type="button" style={{ width: '100%' }} className="btn btn-primary">{props.answers[1].word}</button>
          </li>
          <li className="list-group-item">
            <button type="button" style={{ width: '100%' }} className="btn btn-primary">{props.answers[2].word}</button>
          </li>
          <li className="list-group-item">
            <button type="button" style={{ width: '100%' }} className="btn btn-primary">{props.answers[3].word}</button>
          </li>
        </ul>
        </div>
    </div>
  )
}

export default QuestionCard

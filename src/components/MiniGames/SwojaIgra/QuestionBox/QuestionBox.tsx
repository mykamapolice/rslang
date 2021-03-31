import React, { FC } from 'react';
import QuestionCard from '../SwojaIgraQuestionCard/SwojaIgraQuestionCard';

const QuestionBox = (props: any)=>{

  const {questions} = props

  const cards = questions.map((item: any) => {
   return  <QuestionCard image={item.image} answers={item.answers}/>
  })

  console.log(cards)

  return (
    <div>
      <h1>Question Number:{questions[0].image}</h1>
      <h2>Score:</h2>
      {cards}
    </div>
  )
}

export default QuestionBox

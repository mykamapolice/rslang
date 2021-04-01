import React, { FC, useEffect, useState } from 'react';
import QuestionCard from '../SwojaIgraQuestionCard/SwojaIgraQuestionCard';

const QuestionBox = (props: any)=>{

  const [questionNumber, setQuestionNumber] = useState(0)

  const {questions} = props

  useEffect(() => {
    if(questionNumber === 10) {
      props.setStarted(false)
    }

  }, [questionNumber])

  const cards = questions.map((item: any) => {
   return  <QuestionCard
     questionNumber={questionNumber}
     setQuestionNumber={setQuestionNumber}
     image={item.image}
     answers={item.answers}/>
  })

  return (
    <div>
      <h1>Question Number: {questionNumber + 1}</h1>
      <h2>Score:</h2>
      {cards[questionNumber]}
    </div>
  )
}

export default QuestionBox

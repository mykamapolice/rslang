import React from 'react';
import { Alert } from 'react-bootstrap';
import styles from './SwojaIgraStat.module.css'

const SwojaIgraStat = (props: any) => {

  const {score, questionsNumbers} = props

  return(
    <div className={styles.statContainer}>
      {score === questionsNumbers ?
        <>
          <img src='https://res.cloudinary.com/dhp3eaod5/image/upload/v1617899485/unnamed_vraxen.jpg' alt='' />
          <Alert variant="success">
            <Alert.Heading>Вы ответили правильно на все {score} вопросов, поздравляем!</Alert.Heading>
          </Alert>
        </>
        : <>
          <img src='https://res.cloudinary.com/dhp3eaod5/image/upload/v1617899478/vzhuh_132592383_orig__sbelbm.jpg' alt='' />
        <Alert variant="success">
          <Alert.Heading>Вы ответили правильно на {score} из {questionsNumbers} вопросов, попробуйте ешё раз!</Alert.Heading>
        </Alert>
      </>}
    </div>
  )
}

export default SwojaIgraStat

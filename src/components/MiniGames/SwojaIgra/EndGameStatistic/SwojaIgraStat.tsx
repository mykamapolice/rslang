import React from 'react';
import { Alert } from 'react-bootstrap';
import styles from './SwojaIgraStat.module.css'

const SwojaIgraStat = (props: any) => {

  const {score, questionsNumbers} = props

  return(
    <div className={styles.statContainer}>
      {score === questionsNumbers ?
        <>
          <img src='https://lh3.googleusercontent.com/proxy/abRGPlx9KWhL0Krxn_uoAJXb5K2RK3N9pfujvr1wAzdQ9Imv7MvS4cc6NzYXXEQ97lrpM8EF7kEWOGQjk0-UN9LTebw' alt='' />
          <Alert variant="success">
            <Alert.Heading>Вы ответили правильно на все {score} вопросов, поздравляем!</Alert.Heading>
          </Alert>
        </>
        : <>
          <img src='https://lh3.googleusercontent.com/proxy/ZRNRapGoFivMbZecizvjmHUfRuZPAK8sYOBZAcsvaGpECaJe6pJhVm5vxNoTjSOdnPg2Fb8KZqxz8hCgUoLCdbtOSYw' alt='' />
        <Alert variant="success">
          <Alert.Heading>Вы ответили правильно на {score} из {questionsNumbers} вопросов, попробуйте ешё раз!</Alert.Heading>
        </Alert>
      </>}
    </div>
  )
}

export default SwojaIgraStat

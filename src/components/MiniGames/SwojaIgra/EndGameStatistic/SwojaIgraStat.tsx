import React from 'react';
import { Alert } from 'react-bootstrap';
import styles from './SwojaIgraStat.module.css'

const SwojaIgraStat = () => {
  return(
    <div className={styles.statContainer}>
      <img src='https://lh3.googleusercontent.com/proxy/ZRNRapGoFivMbZecizvjmHUfRuZPAK8sYOBZAcsvaGpECaJe6pJhVm5vxNoTjSOdnPg2Fb8KZqxz8hCgUoLCdbtOSYw' alt='' />
      <Alert variant="success">
        <Alert.Heading>Вы ответили правильно на 10 из 20 слов</Alert.Heading>
      </Alert>
    </div>
  )
}

export default SwojaIgraStat

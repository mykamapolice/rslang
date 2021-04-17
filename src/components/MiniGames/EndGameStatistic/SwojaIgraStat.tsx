import React from 'react';
import { Alert } from 'react-bootstrap';
import styles from './SwojaIgraStat.module.css';
import { Button } from 'react-bootstrap';
import { VolumeUp } from 'react-bootstrap-icons';
import {baseUrl} from '../../../utils/constants'
const audio = new Audio();

const SwojaIgraStat = (props: any) => {
	const { score, questionsNumbers, gameResults } = props;
  console.log(gameResults)

	const audioHandler = (link: string) => {
	audio.src = `${baseUrl}${link}`;
  audio.play();
	};

	return (
		<div className={styles.statContainer}>
			{/* {score === questionsNumbers ? (
				<>
					<img
						src='https://res.cloudinary.com/dhp3eaod5/image/upload/v1617899485/unnamed_vraxen.jpg'
						alt=''
					/>
					<Alert variant='success'>
						<Alert.Heading>
							Вы ответили правильно на все {score} вопросов, поздравляем!
						</Alert.Heading>
					</Alert>
				</>
			) : (
				<>
					<img
						src='https://res.cloudinary.com/dhp3eaod5/image/upload/v1617899478/vzhuh_132592383_orig__sbelbm.jpg'
						alt=''
					/>
					<Alert variant='success'>
						<Alert.Heading>
							Вы ответили правильно на {score} из {questionsNumbers} вопросов,
							попробуйте ешё раз!
						</Alert.Heading>
					</Alert>
				</>
			)} */}

			<div className='container'>
				<span>угаданные слова</span>
				{gameResults.answered.map((el: any) => (
					<div>
						<span>{el.correct}</span>
						<span>{el.wordTranslate}</span>{' '}
						<Button
							title='проиграть аудио'
							variant='outline-info'
							onClick={() => {
								audioHandler(el.audio);
							}}
						>
							<VolumeUp className='text-dark' size={20} />
						</Button>
					</div>
        ))}
        		<span>неугаданные слова</span>
				{gameResults.notAnswered.map((el: any) => (
					<div>
						<span>{el.correct}</span>
						<span>{el.wordTranslate}</span>{' '}
						<Button
							title='проиграть аудио'
							variant='outline-info'
							onClick={() => {
								audioHandler(el.audio);
							}}
						>
							<VolumeUp className='text-dark' size={20} />
						</Button>
					</div>
        ))}
			</div>
		</div>
	);
};

export default SwojaIgraStat;

import React, {useEffect} from 'react';
import { Alert } from 'react-bootstrap';
import styles from './SwojaIgraStat.module.css';
import { Button } from 'react-bootstrap';
import { VolumeUp } from 'react-bootstrap-icons';
import { baseUrl } from '../../../utils/constants';
import { NavLink } from 'react-router-dom';

const audio = new Audio();

const SwojaIgraStat = (props: any) => {
	const { score, questionsNumbers, gameResults,startNewGame } = props;
	

	const audioHandler = (link: string) => {
		audio.src = `${baseUrl}${link}`;
		audio.play();
	};

	useEffect(() => {
		return () => {
			for(let key in gameResults){
				gameResults[key] = []
			}
		}
	}, [])

	return (
		<div className={styles.statContainer}>
			{score === questionsNumbers ? (
				<>
					<Alert variant='success'>
						<Alert.Heading>
							Вы ответили правильно на все {score} вопросов, поздравляем!
						</Alert.Heading>
					</Alert>
				</>
			) : (
				<>
					<Alert variant='success'>
						<Alert.Heading>
							Вы ответили правильно на {score} из {questionsNumbers} вопросов,
							попробуйте ещё раз!
						</Alert.Heading>
					</Alert>
				</>
			)}

			<div className={`container py-2 ${styles.wordsContainer}`}>
				{gameResults.answered.length>0 && (
					<>
						<h4 className='lead mb-4'>угаданные слова:</h4>
						<div className='wordsBlock'>
							{gameResults.answered.map((el: any) => (
								<div
									key={el.id}
									className='row mb-4 px-3 justify-content-around align-items-center'
								>
									<div className={`col ${styles.statWord}`}>{el.correct}</div>
									<div className={`col ${styles.statWord}`}>
										{el.wordTranslate}
									</div>{' '}
									<div className={styles.statsPhoto}>
										<img src={`${baseUrl}${el.image}`} alt='' />
									</div>
									<div className='col'>
										<Button
											className={`${styles.btnStats}`}
											title='проиграть аудио'
											variant='outline-info'
											onClick={() => {
												audioHandler(el.audio);
											}}
										>
											<VolumeUp className='text-dark' size={20} />
										</Button>
									</div>
								</div>
							))}
						</div>
					</>
				)}
				{gameResults.notAnswered.length>0 && (
					<>
						<h4 className='lead mb-4'>неугаданные слова:</h4>
						{gameResults.notAnswered.map((el: any) => (
							<div
								key={el.id}
								className='row mb-4 px-3 justify-content-around align-items-center'
							>
								<div className={`col ${styles.statWord}`}>{el.correct}</div>
								<div className={`col ${styles.statWord}`}>
									{el.wordTranslate}
								</div>{' '}
								<div className={styles.statsPhoto}>
									<img src={`${baseUrl}${el.image}`} alt='' />
								</div>
								<div className='col'>
									<Button
										className={`${styles.btnStats}`}
										title='проиграть аудио'
										variant='outline-info'
										onClick={() => {
											audioHandler(el.audio);
										}}
									>
										<VolumeUp className='text-dark' size={20} />
									</Button>
								</div>
							</div>
						))}
					</>
				)}
			</div>
			<div className={`statsButtonblock mt-2`}>
			<Button onClick={startNewGame} className='mr-2 ' variant='outline-dark'>Сыграть ещё</Button>
			<NavLink to='/book'>
			<Button variant='outline-info'>В учебник</Button>
			</NavLink>
			</div>
		</div>
	);
};

export default SwojaIgraStat;

import React, { useState, useEffect, useRef, useCallback } from 'react';

import { baseUrl } from '../../utils/constants';
const levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

interface IAnswers {
	isCorrect: boolean;
	word: string;
	wordTranslate: string;
}

const audio: HTMLAudioElement = new Audio();

const hotKeys: string[] = ['a', 'b', 'c', 'd'];

let pigSize = 0;

const Card = ({
	questions,
	questionNumber,
	nextWordHandler,
	containerRef,
	score,
}: any) => {
	const titleRef: any | null = useRef(null);
	let cancel: number;

	useEffect(() => {
		engine();
		return () => cancelAnimationFrame(cancel);
	}, [questionNumber]);

	const engine = () => {
		if (containerRef?.current && titleRef?.current) {
			const currentHeight = parseInt(getComputedStyle(titleRef.current).top);
			if (currentHeight >= containerRef.current.clientHeight - 200)
				nextWordHandler();
			else {
				titleRef.current.style.top = `${currentHeight + 2}px`;
				cancel = requestAnimationFrame(engine);
			}
		}
	};

	return (
		<div key={questions[questionNumber].id} className='container'>
			<h1
				ref={titleRef}
				className='wordSavannah'
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					margin: 'auto',
					top: 0,
					zIndex: 0,
					width: 'max-content',
				}}
			>
				{questions[questionNumber].correct}
			</h1>
			<div>выберите правильный ответ:</div>
			<div className='d-flex justify-content-around'>
				{questions[questionNumber].answers.map((el: IAnswers, i: number) => (
					<button
						type='button'
						className='btn btn-outline-info'
						style={{ display: 'inline-block' }}
						key={i}
						data-iscorrect={el.isCorrect}
						onClick={nextWordHandler}
					>
						{`${hotKeys[i].toUpperCase()}. ${el.wordTranslate}`}
					</button>
				))}
			</div>
			<div style={{ display: 'none' }}>
				<img src={baseUrl + questions[questionNumber].image} />
				<button onClick={nextWordHandler}>Следующее слово</button>
			</div>

			<img
				key='pig'
				className='pig'
				style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					right: 0,
					margin: 'auto',
					height: `${pigSize <= 0 ? 200 : pigSize * 20 + 200}px`,
					width: `${pigSize <= 0 ? 200 : pigSize * 20 + 200}px`,
					transition: '1s',
					zIndex: -999,
				}}
				src={`${process.env.PUBLIC_URL}/pig.svg`}
			></img>
		</div>
	);
};

const SavannahGame = (props: any) => {
	const {
		isLogin,
		addWordToUser,
		updateUserWord,
		questionsNumbers,
		setStarted,
		questions,
		showFinishInfo,
		setScore,
		score,
	} = props;

	const [questionNumber, setQuestionNumber] = useState(0);
	const [answer, setAnswer] = useState(false);
	const containerRef: any | null = useRef(null);
	useEffect(() => {
		if (questionNumber >= questionsNumbers) {
			pigSize = 0;
			showFinishInfo();
		}
	}, [questionNumber]);

	useEffect(() => {
		if (pigSize) {
			pigSize = 0;
		}
	}, []);

	const sendWordStats = useCallback((isTrue: boolean): void => {
		const current = questions[questionNumber];
		console.log(questions)
		if (questions[questionNumber].userWord) {
			const obj = { ...current.userWord.optional };
			if (isTrue) obj.wins = obj.wins ? obj.wins + 1 : 1;
			else obj.loses = obj.loses ? obj.loses + 1 : 1;
			updateUserWord(current.id, obj);
		}
		else {
			const obj = {
				isLearn: true, isHard: false, isDeleted: false , wins:0, loses:0
			};
			if (isTrue) obj.wins = obj.wins+1;
			else obj.loses = obj.loses+1;
			addWordToUser(current.id, obj);
		}
	},[isLogin]);

	const nextWordHandler = (e?: any) => {
		if (e && JSON.parse(e.target.dataset.iscorrect)) {
			audio.src = `${process.env.PUBLIC_URL}/hruk.mp3`;
			audio.play();
			if (isLogin) sendWordStats(true);
			setScore(score + 1);
			pigSize += 1;
		} else {
			audio.src = `${process.env.PUBLIC_URL}/vizg.mp3`;
			audio.play();
			if (isLogin) sendWordStats(true);
			pigSize ? (pigSize -= 1) : (pigSize = 0);
		}
		setQuestionNumber(questionNumber + 1);
	};

	return (
		<div
			ref={containerRef}
			style={{
				minHeight: '100%',
				flexGrow: 1,
				position: 'relative',
				zIndex: 1,
				//height: '70vh',
				backgroundImage: `url('${process.env.PUBLIC_URL}/images/savannah.jpg')`,
				backgroundPosition: `25% ${75 * pigSize}%`,
				transition: 'all 1s',
			}}
		>
			{questionNumber < questionsNumbers ? (
				<>
					<h1>
						Номер вопроса: {questionNumber + 1} / {questionsNumbers}
					</h1>
					<h2>Количество правильных ответов: {score}</h2>

					<Card
						{...{
							questions,
							questionNumber,
							nextWordHandler,
							score,
							setScore,
							containerRef,
						}}
					/>
				</>
			) : (
				''
			)}
		</div>
	);
};

export default SavannahGame;

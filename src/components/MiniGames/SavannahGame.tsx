import { relative } from 'node:path';
import React, { useState, useEffect, useRef } from 'react';
import { NutFill } from 'react-bootstrap-icons';
import { baseUrl } from '../../utils/constants';
const levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

interface IAnswers {
	isCorrect: boolean;
	word: string;
	wordTranslate: string;
}

const hotKeys: string[] = ['a', 'b', 'c', 'd'];

const Card = ({
	questions,
	questionNumber,
	nextWordHandler,
	score,
	setScore,
}: any) => {
	let cancel: number;

	const titleRef: any | null = useRef(null);
	const containerRef: any | null = useRef(null);

	useEffect(() => {
		engine();
		return () => cancelAnimationFrame(cancel);
	}, [questionNumber]);

	
	const engine = () => {
		console.log('tick');
		if (containerRef?.current&&titleRef?.current) {
				const currentHeight = parseInt(getComputedStyle(titleRef.current).top);
				if (currentHeight >= containerRef.current.clientHeight - 200)
					nextWordHandler();
				else {
					titleRef.current.style.top = `${currentHeight + 5}px`;
					cancel = requestAnimationFrame(engine);
				}
		}
	}

	return (
		<div
			ref={containerRef}
			key={questions[questionNumber].id}
			className='container'
			style={{ position: 'relative', zIndex: 1, height: '70vh' }}
		>
			<h1
				ref={titleRef}
				className='display-3'
				style={{
					position: 'absolute',
					left: 0,
					right: 0,
					margin: 'auto',
					top: 0,
					zIndex: 0,
				}}
			>
				{questions[questionNumber].correct}
			</h1>
			<div>выберите правильный ответ:</div>
			{questions[questionNumber].answers.map((el: IAnswers, i: number) => (
				<button key={i} data-iscorrect={el.isCorrect} onClick={nextWordHandler}>
					{`${hotKeys[i].toUpperCase()}. ${el.wordTranslate}`}
				</button>
			))}
			<div style={{ display: 'none' }}>
				<img src={baseUrl + questions[questionNumber].image} />
				<button onClick={nextWordHandler}>Следующее слово</button>
			</div>
		</div>
	);
};

const SavannahGame = (props: any) => {
	const {
		questionsNumbers,
		setStarted,
		questions,
		showFinishInfo,
		setScore,
		score,
	} = props;

	const [questionNumber, setQuestionNumber] = useState(0);
	const [answer, setAnswer] = useState(false);

	useEffect(() => {
		if (questionNumber >= questionsNumbers) showFinishInfo();
	}, [questionNumber]);

	console.log(questions);

	const nextWordHandler = (e?: any) => {
		if (e && e.target.dataset.isCorrect) setScore(score + 1);
		setQuestionNumber(questionNumber + 1);
	};

	return (
		<div>
			{questionNumber < questionsNumbers ? (
				<>
					<h1>
						Номер вопроса: {questionNumber + 1} / {questionsNumbers}
					</h1>
					<h2>Количество правильных ответов: {score}</h2>

					<Card
						{...{ questions, questionNumber, nextWordHandler, score, setScore }}
					/>
				</>
			) : (
				''
			)}
		</div>
	);
};

export default SavannahGame;

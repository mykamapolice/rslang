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
	const imgBlock: any | null = useRef(null);
	useEffect(() => {
		if (imgBlock !== null) {
			imgBlock.current.style.display = 'none';
		}
	}, [questionNumber]);

	const answerHandler = (e: any) => {
		if (JSON.parse(e.target.dataset.iscorrect)) {
			setScore(score + 1);
		}
		if (imgBlock !== null) {
			imgBlock.current.style.display = 'block';
		}
	};

	return (
		<div>
			{questions[questionNumber].correct}

			<div>выберите правильный ответ:</div>
			{questions[questionNumber].answers.map((el: IAnswers, i: number) => (
				<button key={i} data-iscorrect={el.isCorrect} onClick={answerHandler}>
					{`${hotKeys[i].toUpperCase()}. ${el.wordTranslate}`}
				</button>
			))}
			<div ref={imgBlock} style={{ display: 'none' }}>
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

	const nextWordHandler = (e: any) => {
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

import React, { FC, useEffect, useState } from 'react';
import QuestionCard from '../SwojaIgraQuestionCard/SwojaIgraQuestionCard';

const QuestionBox = (props: any) => {
	const [questionNumber, setQuestionNumber] = useState(0);
	const [ser, setSer] = useState(0)

	const {
		questions,
		questionsNumbers,
		showFinishInfo,
		score,
		setScore,
		longestSeries,
		setLongestSeries
	} = props;

	useEffect(() => {
		if (questionNumber === questionsNumbers) {
			showFinishInfo();
		}
	}, [questionNumber]);

	const cards = questions.map((item: any) => {
		return (
			<QuestionCard
				questionNumber={questionNumber}
				setQuestionNumber={setQuestionNumber}
				image={item.image}
				answers={item.answers}
				score={score}
				setScore={setScore}
				ser={ser}
				setSer={setSer}
				longestSeries={longestSeries}
				setLongestSeries={setLongestSeries}
			/>
		);
	});

	return (
		<div>
			<h1>
				Номер вопроса: {questionNumber + 1} / {questionsNumbers}
			</h1>
			<h2>Количество правильных ответов: {score}</h2>
			{cards[questionNumber]}
		</div>
	);
};

export default QuestionBox;

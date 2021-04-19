import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	useRef,
} from 'react';
import { Button } from 'react-bootstrap';
import './SprintGame.css';
import { publicFolder } from '../../../utils/constants';

const audio = new Audio();
const srcs = {
	ifTrue: `${publicFolder}/Sprint/true.mp3`,
	ifFalse: `${publicFolder}/Sprint/false.mp3`,
};

export const SprintGame = (props: any) => {
	const {
		questionsNumbers,
		score,
		setScore,
		questions,
		showFinishInfo,
		sendWordStats,
		longestSeries,
		setLongestSeries,
		soundVolume,
	} = props;

	const [ser, setSer] = useState(0);
	const [questionNumber, setQuestionNumber] = useState(0);
	const timerRef: any | null = useRef(null);

	useEffect(() => {
		console.log(timerRef.current);
		timerRef.current?.addEventListener('animationend', timeIsOut);
		return () => {
			timerRef.current?.removeEventListener('animationend', timeIsOut);
		};
	}, [timerRef]);

	const timeIsOut = useCallback(() => {
		questions.forEach((e: any, i: number) => {
			if (i >= questionNumber) {
				sendWordStats(e, false);
			}
			showFinishInfo();
		});
	}, [questionNumber]);

	const audioHandler = useCallback(
		(bool: boolean) => {
			audio.src = bool ? srcs.ifTrue : srcs.ifFalse;
			audio.volume = soundVolume * 0.01;
			audio.play();
		},
		[soundVolume]
	);

	const cyphers = useMemo(
		() =>
			[...Array(30)].map((_, i: number, arr: any[]) => (
				<span>{arr.length - i}</span>
			)),
		[]
	);
	const question = questions[questionNumber];
	const { correct, answers } = question;
	const variant = useMemo(() => answers[Math.floor(Math.random() * 4)], [
		questionNumber,
	]);

	const validateAnswer = useCallback(
		(bool: boolean) => {
			if (variant.isCorrect === bool) {
				audioHandler(true);
				setScore((prev: any) => prev + 1);
				sendWordStats(question, true);
				setSer((prev: number) => prev + 1);
				if (longestSeries < ser) {
					setLongestSeries(ser);
				}
			} else {
				audioHandler(false);
				sendWordStats(question, false);
				setSer(0);
			}
			if (questionNumber === questionsNumbers - 1) {
				showFinishInfo();
			}
			setQuestionNumber(prev => prev + 1);
		},
		[
			variant,
			setScore,
			questionNumber,
			questionsNumbers,
			showFinishInfo,
			setQuestionNumber,
		]
	);

	return (
		<div className='sprint-game'>
			<h1>
				Номер вопроса: {questionNumber + 1} / {questionsNumbers}
			</h1>
			<h2>Количество правильных ответов: {score}</h2>
			<h3>
				{correct} - {variant.wordTranslate}
			</h3>
			<div className='timer'>
				<div className='timer__line'></div>
				<div className='timer__body'>
					<div ref={timerRef} className='timer__counter'>
						{cyphers}
					</div>
				</div>
			</div>

			<Button variant='outline-success' onClick={() => validateAnswer(true)}>
				Верно
			</Button>
			<Button variant='outline-danger' onClick={() => validateAnswer(false)}>
				Не верно
			</Button>
		</div>
	);
};

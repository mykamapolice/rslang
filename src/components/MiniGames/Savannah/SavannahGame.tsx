import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { publicFolder } from '../../../utils/constants';
import './SavannahGame.css'


const levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

interface IAnswers {
	isCorrect: boolean;
	word: string;
	wordTranslate: string;
}

const audio: HTMLAudioElement = new Audio();

const hotKeys: string[] = ['1', '2', '3', '4'];

const Card = ({
	questions,
	questionNumber,
	nextWordHandler,
	containerRef,
	pigSize,
}: any) => {
	const titleRef: any | null = useRef(null);
	const buttonsRef : any|null = useRef(null);
	let cancel: number;


	useEffect(() => {
		document.addEventListener('keydown', buttonHandler);
		engine();
		return () => {
		document.removeEventListener('keydown', buttonHandler)
			cancelAnimationFrame(cancel)};
	}, [questionNumber]);

	const engine = () => {
		if (containerRef?.current && titleRef?.current) {
			const currentHeight = ((parseFloat(getComputedStyle(titleRef.current).top)/(containerRef.current.clientHeight/100)));
			if (currentHeight >= 70)
				nextWordHandler();
			else {
				titleRef.current.style.top = `${currentHeight + 0.4}%`;
				cancel = requestAnimationFrame(engine);
			}
		}
	};

	const buttonHandler = (e: any) => {
		if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4') {
			buttonsRef.current?.children[+e.key - 1].click();
		}
	};

const questionAnswers = questions[questionNumber].answers.map((el: IAnswers, i: number) => (

	<button
		key={i}
		className='btn btn-outline-dark savannah_button'
		data-iscorrect={el.isCorrect}
		onClick={nextWordHandler}
	>
		{`${hotKeys[i].toUpperCase()}. ${el.wordTranslate}`}
	</button>
));


	return (
		<div key={questions[questionNumber].id} className='container '>
			<h1
				ref={titleRef}
				className='wordSavannah'
			>
				{questions[questionNumber].correct}
			</h1>
			<img
				className='pig'
				style={{
					height: `${pigSize <= 0 ? 200 : pigSize * 20 + 200}px`,
					width: `${pigSize <= 0 ? 200 : pigSize * 20 + 200}px`

				}}
				src={`${process.env.PUBLIC_URL}/pig.svg`}
			></img>
						<div ref={buttonsRef} className='d-flex justify-content-between'>
				{questionAnswers}
			</div>
		</div>
	);
};

const SavannahGame = (props: any) => {
	const [ser, setSer] = useState(0)

	const {
		isLogin,
		questionsNumbers,
		questions,
		showFinishInfo,
		setScore,
		score,
		sendWordStats,
		longestSeries,
		setLongestSeries
	} = props;

	const {soundVolume} = useSelector((state:any)=> state.settings)
	const [questionNumber, setQuestionNumber] = useState(0);
	const [pigSize, setPigSize] = useState(0);
	const containerRef: any | null = useRef(null);
	audio.volume = soundVolume*0.01;

	useEffect(() => {
		if (questionNumber >= questionsNumbers) {
			showFinishInfo();
		}
	}, [questionNumber]);

	useEffect(() => {
		if (pigSize) {
			setPigSize(0);
		}
	}, [questions]);

	const nextWordHandler = (e?: any) => {
		if (e && JSON.parse(e.target.dataset.iscorrect)) {
			audio.src = `${publicFolder}/hruk.mp3`;
			audio.play();
			setSer((prev: number) => prev + 1)
			if(longestSeries < ser) {
				setLongestSeries(ser)

			}
			if (isLogin) sendWordStats(questions[questionNumber],true);
			setScore(score + 1);
			setPigSize(pigSize+1);
		} else {
			audio.src = `${publicFolder}/vizg.mp3`;
			audio.play();
			setSer(0)
			if (isLogin) sendWordStats(questions[questionNumber],false);
			pigSize ? (setPigSize(pigSize-1)) : (setPigSize(0));
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
				backgroundImage: `url('${publicFolder}/images/savannah.jpg')`,
				backgroundPosition: `top ${100*pigSize}px right 10px`,
				transition: 'all 1s',
			}}
		>
			{questionNumber < questionsNumbers ? (
				<>
				<div className="savannah_title_wrapper">
					<div className="savannah-title">
					<h1 className="text-info">
						Номер вопроса: {questionNumber + 1} / {questionsNumbers}
					</h1>
					<h2 className="text-info">Количество правильных ответов: {score}</h2>
					<h5 className="text-info">выберите правильный ответ:</h5>
					</div>
					</div>
					<Card
						{...{
							questions,
							questionNumber,
							nextWordHandler,
							score,
							setScore,
							containerRef,
							pigSize
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

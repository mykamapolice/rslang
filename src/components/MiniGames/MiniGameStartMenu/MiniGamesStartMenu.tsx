import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllWords, createWord, updateWord } from '../../../redux/reducers/vocabulary';
import QuestionBox from '../SwojaIgra/QuestionBox/QuestionBox';
import Rules from '../Rules/Rules';
import { Alert, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import SwojaIgraStat from '../EndGameStatistic/SwojaIgraStat';
import styles from './MiniGamesStartMenu.module.css';
import getQuestions from '../RandomiseQuestions';
import AudiocallGameBox from '../Audiocall/AudiocallGameBox/AudiocallGameBox';
import SavannahGame from '../SavannahGame';
import { SprintGame } from '../Sprint/SprintGame';
import { IWord } from '../../../interfaces';

interface IGameProps {
	game: string,
	bookWords?: IWord[];
}

const MiniGamesStartMenu = (props: any): JSX.Element => {
	const { game, bookWords }: IGameProps = props.location.state;

	const [isStarted, setStarted] = useState(false);
	const [finish, setFinish] = useState(false);
	const [questions, setQuestions]: any[] = useState([]);
	const [questionsNumbers, setQuestionsNumbers] = useState(bookWords ? bookWords.length : 20);
	const [lvl, setLvl] = useState(0);
	const [score, setScore] = useState(0);
	const rules = 'Вам дана картинка и 4 слова на английском языке. Нужно выбрать слово которое больше всего соответствует для данной картинки';

	const dispatch = useDispatch();
	const state: any = useSelector(state => state);
	const isLogin = state.user.isAuth;
	const token = state.user.token;
	const userId = state.user.userId;
	const {
		vocabulary: { words },
	} = state;
	const wordsCopy = bookWords || words;
	useEffect(() => {
		if (bookWords)
			useQuestions();
		if (!words) dispatch(getAllWords({ userId, token, lvl }));
	}, [isStarted]);

	const addWordToUser = useCallback(
		async (wordId: string, type: any) => {
			const obj = {
				userId,
				wordId,
				token,
				word: { optional: { ...type, isExist: true } },
			};

			await dispatch(createWord(obj));
		},
		[isLogin]
	);

	const updateUserWord = useCallback(
		async (wordId: string, type: any) => {
			const obj = {
				userId,
				wordId,
				token,
				type,
			};
			await dispatch(updateWord(obj));
		},
		[isLogin]
	);

	const showFinishInfo = () => {
		setFinish(true);
		setStarted(false);
		setTimeout(() => {
			setFinish(false);
			setScore(0);
		}, 5000);
	};

	const setQuestionNumbers = (val: number) => setQuestionsNumbers(val);
	const setLevel = (val: number) => setLvl(val);

	const useQuestions = () => {
		if (words) {
			setQuestions(getQuestions(wordsCopy, words, questionsNumbers));
			setStarted(true);
		}
	};

	const currentMiniGame = () => {
		switch (game) {
			case 'SwojaIgra':
				return (
					<QuestionBox
						addWordToUser={addWordToUser}
						updateUserWord={updateUserWord}
						questionsNumbers={questionsNumbers}
						setStarted={setStarted}
						questions={questions}
						showFinishInfo={showFinishInfo}
						setScore={setScore}
						score={score}
					/>
				);
			case 'Sprint':
				return <SprintGame
					isLogin={isLogin}
					addWordToUser={addWordToUser}
					updateUserWord={updateUserWord}
					questionsNumbers={questionsNumbers}
					setStarted={setStarted}
					questions={questions}
					showFinishInfo={showFinishInfo}
					setScore={setScore}
					score={score} />;
			case 'Savannah':
				return (
					<SavannahGame
						isLogin={isLogin}
						addWordToUser={addWordToUser}
						updateUserWord={updateUserWord}
						questionsNumbers={questionsNumbers}
						setStarted={setStarted}
						questions={questions}
						showFinishInfo={showFinishInfo}
						setScore={setScore}
						score={score}
					/>
				);
			case 'Audiocall':
				return <AudiocallGameBox
					addWordToUser={addWordToUser}
					updateUserWord={updateUserWord}
					questionsNumbers={questionsNumbers}
					setStarted={setStarted}
					questions={questions}
					showFinishInfo={showFinishInfo}
					setScore={setScore}
					score={score}
				/>;
		}
	};

	return (
		<div className='Vocabulary'>
			{finish ? (
				<SwojaIgraStat questionsNumbers={questionsNumbers} score={score} />
			) : !isLogin ? (
				<Alert variant='danger'>
					<Alert.Heading>Пожалуйста авторизируйтесь</Alert.Heading>
				</Alert>
			) : isStarted ? (
				currentMiniGame()
			) : (
				<>
					<div className={styles.SwojaIgraContainer}>
						<h2 className='fs-3'>Выберите уровень слов:</h2>
						<ToggleButtonGroup
							type='radio'
							name='options'
							value={lvl}
							onChange={setLevel}
						>
							<ToggleButton value={0}>1</ToggleButton>
							<ToggleButton value={1}>2</ToggleButton>
							<ToggleButton value={2}>3</ToggleButton>
							<ToggleButton value={3}>4</ToggleButton>
							<ToggleButton value={4}>5</ToggleButton>
							<ToggleButton value={5}>6</ToggleButton>
						</ToggleButtonGroup>

						<h2>Выберите количество вопросов:</h2>
						<ToggleButtonGroup
							type='radio'
							name='options'
							value={questionsNumbers}
							onChange={setQuestionNumbers}
						>
							<ToggleButton value={5}>5</ToggleButton>
							<ToggleButton value={10}>10</ToggleButton>
							<ToggleButton value={15}>15</ToggleButton>
							<ToggleButton value={20}>20</ToggleButton>
						</ToggleButtonGroup>
						<Rules rules={rules} />

						<button
							onClick={useQuestions}
							type='button'
							className='btn btn-outline-success btn-lg'
						>
							Нажмите чтобы начать игру :)
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default MiniGamesStartMenu;

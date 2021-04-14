import { IWord } from '../../interfaces';

let usedQuestions: any[] = [];

const getIncorrectWords = (correctWord: string, wordsCopy: IWord[]) => {
	const arrayOfIncorrect: any[] = [];
	const wordsToCheck: any[] = [];

	while (arrayOfIncorrect.length !== 3) {
		const randomQuestionNumber: number = Math.floor(
			Math.random() * wordsCopy.length
		);
		const { word, wordTranslate } = wordsCopy[randomQuestionNumber];

		if (word !== correctWord && !wordsToCheck.includes(word)) {
			arrayOfIncorrect.push({ word, isCorrect: false, wordTranslate });
			wordsToCheck.push(word);
		}
	}
	return arrayOfIncorrect;
};

const addNewQuestionToArray = (wordsCopy: IWord[]) => {
	const randomQuestionNumber: number = Math.floor(
		Math.random() * wordsCopy.length
	);
	const { image, word, audio, wordTranslate, id, _id, userWord } = wordsCopy[
		randomQuestionNumber
	];

	if (!usedQuestions.includes(randomQuestionNumber)) {
		usedQuestions.push(randomQuestionNumber);

		let answers: any[] = getIncorrectWords(word, wordsCopy);
		answers.push({ word, isCorrect: true, wordTranslate });
		answers = answers.sort(() => Math.random() - 0.5);

		const newQuestion = {
			image,
			answers,
			correct: word,
			audio,
			id: id || _id,
			userWord: userWord || null,
		};
		return newQuestion;
	}
};

const getQuestions = (wordsCopy: IWord[], questionsNumbers: number) => {
	const questionsCopy = [];
	while (questionsCopy.length !== questionsNumbers) {
		const question = addNewQuestionToArray(wordsCopy);
		if (question !== undefined) {
			questionsCopy.push(question);
		}
	}
	usedQuestions = [];
	return questionsCopy;
};

export default getQuestions;

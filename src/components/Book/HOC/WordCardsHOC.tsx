import React from 'react';
import { IWord } from '../../../interfaces';
import BaseInfo from '../WordCards/BaseInfo/BaseInfo';

interface IWordTypeKeys {
	[key: string]: boolean;
}
interface IWordType {
	[key: string]: IWordTypeKeys;
}
interface IWordCardsProps {
	baseUrl: string;
	isAuth: boolean;
	vMode?: boolean;
	value?: number;
	words: IWord[];
	mappedWords?: any[];
	audioHandler: () => void;
	addWordToUser: (wordId: string, type: any) => void;
	updateUserWord: (wordId: string, type: any) => void;
}

const wordTypeProps: IWordType = {
	learn: { isLearn: true, isHard: false, isDeleted: false },
	hard: { isLearn: false, isHard: true, isDeleted: false },
	delete: { isLearn: false, isHard: false, isDeleted: true },
};

const WordCardHOC = (Component: React.ComponentType<IWordCardsProps>) => {
	return (props: IWordCardsProps) => {
		const {
			vMode,
			isAuth,
			value,
			baseUrl,
			words,
			audioHandler,
			addWordToUser,
			updateUserWord,
		} = props;

		const buttonHandler = (el: IWord, action: string) => {
			el.hasOwnProperty('userWord')
				? updateUserWord(el.id || el._id, { ...wordTypeProps[action],wins:el.userWord.optional.wins,loses:el.userWord.optional.loses })
				: addWordToUser(el.id || el._id, { ...wordTypeProps[action],wins:0,loses:0 });
		};

		const setCardBgColor = (el: IWord) => {
			return {
				backgroundColor:
					(el.hasOwnProperty('userWord') &&
						((el.userWord.optional.isLearn && 'rgba(253, 255, 182,0.9)') ||
							(el.userWord.optional.isHard && 'rgba(255, 214, 165, 0.9)') ||
							(el.userWord.optional.isDeleted && 'rgba(255, 173, 173,0.9)'))) ||
					'rgba(253, 255, 182,0.9)',
			};
		};

		const cardFilter = (el: IWord) => {
			if (el.hasOwnProperty('userWord')) {
				if (el.userWord.hasOwnProperty('optional')) {
					if (el.userWord.optional.hasOwnProperty('isDeleted')) {
						if (!el.userWord.optional.isDeleted) {
							return el;
						} else if (vMode && value === 2) {
							return el;
						}
					} else return el;
				} else return el;
			} else return el;
		};

		const mappedWords = words
			.filter((el: IWord) => cardFilter(el))
			.map(
				(el: IWord): JSX.Element => {
					const cardColor = setCardBgColor(el);
					const props = {
						el,
						cardColor,
						baseUrl,
						isAuth,
						vMode,
						buttonHandler,
						value,
						audioHandler,
					};
					return <BaseInfo key={el.id || el._id} {...props} />;
				}
			);

		return <Component {...props} mappedWords={mappedWords} />;
	};
};

export default WordCardHOC;

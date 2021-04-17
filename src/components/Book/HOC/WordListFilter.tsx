import React from 'react';
import { IWord } from '../../../interfaces';
import { useSelector } from 'react-redux';

interface IWordTypeKeys {
	[key: string]: boolean;
}
interface IWordType {
	[key: string]: IWordTypeKeys;
}

const wordTypeProps: IWordType = {
	learn: { isLearn: true, isHard: false, isDeleted: false },
	hard: { isLearn: false, isHard: true, isDeleted: false },
	delete: { isLearn: false, isHard: false, isDeleted: true },
};

const WordListFilter = (Component: React.ComponentType<any>) => {
	return (props: any) => {
		const state: any = useSelector(state => state);
		const { vMode, value, words } = state.vocabulary;

		const cardFilter = (el: IWord) => {

						if (!el.userWord?.optional?.isDeleted) {
							return el;
						} else if (vMode && value === 2) {
							return el;
						}
		};

		const filteredWords = words ? words.filter((el: IWord) => cardFilter(el)) : [];

		return <Component {...props} filteredWords={filteredWords} />;
	};
};

export default WordListFilter;

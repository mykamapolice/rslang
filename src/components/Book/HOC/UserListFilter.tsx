import React,{useMemo} from 'react';
import { IWord } from '../../../interfaces';
import { useSelector } from 'react-redux';

interface IWordTypeKeys {
	[key: string]: boolean;
}
interface IWordType {
	[key: string]: IWordTypeKeys;
}
const wordType = ['learn', 'hard', 'deleted'];

const wordTypeProps = {
	learn: { isLearn: true, isHard: false, isDeleted: false },
	hard: { isLearn: false, isHard: true, isDeleted: false },
	delete: { isLearn: true, isHard: false, isDeleted: false },
};

const wordMapperCheck = (
	value: number,
	{ isLearn, isHard, isDeleted }: any
) => {
	switch (value) {
		case 0:
			if (isLearn || isHard) return true;
			break;
		case 1:
			if (isHard) return true;
			break;
		case 2:
			if (isDeleted) return true;
			break;
		default:
			break;
	}
};

const userListFilter = (Component: React.ComponentType<any>) => {
	return (props: any) => {
		const { userList, value, lvl, page } = useSelector((state:any) => state.vocabulary);
		const	filteredWords = useMemo( () => userList
			? userList
					.filter((el: IWord) => {
						if (
							wordMapperCheck(value, el.userWord.optional) &&
							el.group === lvl
						)
							return el;
					})
					.filter((el: IWord, i: number, arr: IWord[]) => {
						const startIndex = Math.ceil(
							(arr.length / (arr.length / 20)) * page
						);
						if (i >= startIndex && i < startIndex + 20) return el;
					})
			: [], [userList,value,lvl,page])

		return <Component {...props} filteredWords={filteredWords} />;
	};
};

export default userListFilter;

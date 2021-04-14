import React, { useMemo, useCallback, useEffect } from 'react';
import { IWord } from '../../../interfaces';
import Pagination from './Pagination';

interface PaginationProps {
	vMode: boolean;
	lvl: number;
	page: number;
	value: 0 | 1 | 2;
	userList: IWord[] | null;
	setPage: (n: number) => void;
	paginationNumbs?: any[];
	buttonHandler?: (expression: boolean) => void;
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

const VocabularyPages = ({
	vMode,
	value,
	userList,
	lvl,
	page,
	setPage,
}: any) => {
	const vocabularyWordList = useMemo(
		() =>
			userList
				? userList
						.filter((el: IWord) => wordMapperCheck(value, el.userWord.optional))
						.filter((el: IWord) => el.group === lvl)
				: [],
		[userList, value, lvl, page]
	);

	const paginationLength = useMemo(
		() => Math.ceil(vocabularyWordList.length / 20),
		[vocabularyWordList]
	);

	const paginationNumbs = useMemo(
		() =>
			[...Array(paginationLength)].map((_, i: number, arr: null[]) => {
				const diggCheck =
					i === page ||
					i === page - 1 ||
					i === page + 1 ||
					(page === 0 && i === page + 2) ||
					(page === arr.length - 1 && i === page - 2);

				return (
					<li
						key={arr.length - i}
						style={{ display: `${diggCheck ? 'inline' : 'none'}` }}
						className={`page-item  
      ${page === i ? 'active' : ''}`}
					>
						<button
							className='page-link'
							id={`${i}`}
							onClick={(e: any) => setPage(+e.target.id)}
						>
							{i + 1}
						</button>
					</li>
				);
			}),
		[userList, lvl, page, value]
	);

	const buttonHandler = useCallback(
		(expression: boolean): void => {
			switch (expression) {
				case true:
					if (page !== paginationLength - 1) setPage(page + 1, expression);
					break;
				case false:
					if (page !== 0) setPage(page - 1, expression);
					break;
			}
		},
		[page]
	);

	return (
		<>
			{paginationLength && (
				<Pagination
					{...{
						vMode,
						value,
						paginationNumbs,
						page,
						buttonHandler,
						lvl,
						userList,
						setPage,
						paginationLength
					}}
				/>
			)}
		</>
	);
};

export default VocabularyPages;

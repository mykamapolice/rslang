import React, { useMemo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IWord, IRootState } from '../../../interfaces';
import Pagination from './Pagination';

const WordListPages = ({ setPage }: any) => {
	const paginationLength = 30;
	const vocabulary = useSelector((state: IRootState) => state.vocabulary);
	const { vMode, value, userList, lvl, page, words } = vocabulary;
	const emptyPage = (group: number, page: number) => {
		if (userList) {
			const filteredWords = userList.filter(
				(el: IWord) =>
					group === el.group &&
					page === el.page &&
					el.userWord.optional.isDeleted
			);
			return filteredWords.length >= 20;
		}
	};

	const notActiveList = useMemo(() => {
		const notActive = [...Array(paginationLength)]
			.map((_, i: number) => (emptyPage(lvl, i) ? i : null))
			.filter((el: number | null) => typeof el === 'number');
		return notActive;
	}, [userList, words]);

	const setActivePage = useCallback(
		(page: number, isPlus?: boolean) => {
			console.log(notActiveList)
			if (page < 0) page = paginationLength - 1;
			if (page > paginationLength - 1) page = 0;
			const findEqualPage = notActiveList.findIndex(
				(el: number | null) => el === page
			);
			if (findEqualPage !== -1) {
				const newPage = isPlus ? page + 1 : page - 1;
				setActivePage(newPage, isPlus);
			} else setPage(page);
		},
		[notActiveList]
	);

	useEffect(() => {
		const pageCheck = notActiveList.findIndex(
			(el: number | null) => el === page
		);
		if (pageCheck !== -1) setActivePage(page + 1, true);
	}, [userList,notActiveList]);

	const buttonHandler = useCallback(
		(expression: boolean): void => {
			switch (expression) {
				case true:
					if (page !== paginationLength - 1)
						setActivePage(page + 1, expression);
					break;
				case false:
					if (page !== 0) setActivePage(page - 1, expression);
					break;
			}
		},
		[page,notActiveList]
	);
	const paginationNumbs = useMemo(
		() =>
			[...Array(paginationLength)].map((_, i: number, arr: null[]) => {
				const emptyPageCheck = notActiveList.findIndex(
					(el: number | null) => i === el
				);
				const diggCheck =
					i === page - 1 ||
					i === page ||
					i === page + 1 ||
					(page === 0 && i === page + 2) ||
					(page === arr.length - 1 && i === page - 2);

				return (
					<li
						key={arr.length - i}
						style={{ display: `${diggCheck ? 'inline' : 'none'}` }}
						className={`page-item  
      ${page === i ? 'active' : ''}
      ${emptyPageCheck !== -1 ? 'disabled' : ''}`}
					>
						<button
							className='page-link'
							id={`${i}`}
							onClick={(e: any) => setActivePage(+e.target.id)}
						>
							{i + 1}
						</button>
					</li>
				);
			}),
		[userList, lvl, page, notActiveList]
	);

	return (
		<>
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
					paginationLength,
				}}
			/>
		</>
	);
};

export default WordListPages;

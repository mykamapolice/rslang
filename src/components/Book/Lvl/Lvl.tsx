import React, { useMemo, useCallback } from 'react';
import { IWord, IRootState } from '../../../interfaces';
import { useDispatch, useSelector } from 'react-redux';

function Lvl({ setLvl, levels }: any) {
	const vocabulary = useSelector((state: IRootState) => state.vocabulary);
	const { vMode, userList, lvl } = vocabulary;

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

	const setActivePage = (numb: number, notActive: number[]): number => {
		if (notActive.findIndex((el: number) => el === numb) !== -1) {
			return setActivePage(numb + 1, notActive);
		}
		return numb;
	};

	const setLevelHandler = (numb: number) => {
		if (!vMode) {
			const notActive: any = [...Array(30)]
				.map((_, i: number) => (emptyPage(numb, i) ? i : null))
				.filter((el: number | null) => typeof el === 'number');
			setLvl({
				lvl: numb,
				page: setActivePage(0, notActive),
			});
		} else setLvl({ lvl:numb, page: 0 });
	};

	const lvlMapper = levels.map((elLvl: string, i: number, arr: string[]) => (
		<label
			key={arr.length - i}
			style={{ marginBottom: '0' }}
			className={`btn btn-primary ${
				levels.findIndex((el: string) => el === elLvl) === lvl ? 'active' : ''
			}`}
			htmlFor={`${i}`}
		>
			<input
				style={{ position: 'absolute', opacity: 0 }}
				type='radio'
				className='btn-check'
				name='btnradio'
				id={`${i}`}
				onClick={(e: any) => setLevelHandler(+e.target.id)}
				autoComplete='off'
			/>
			{elLvl}
		</label>
	));
	return <div className='mr-2'>{lvlMapper}</div>;
}

export default Lvl;

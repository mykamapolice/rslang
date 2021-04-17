import React from 'react';
import WordCards from '../WordCards/WordCards';
import { useSelector } from 'react-redux';
import { baseUrl } from '../../../utils/constants';

function WordList({
	updateUserWord,
	audioHandler,
	addWordToUser,
}: any): JSX.Element {
	const { words } = useSelector((state: any) => state.vocabulary);
	const { isAuth } = useSelector((state: any) => state.user);
	return (
		<>
			{words ? (
				<WordCards
					{...{
						isAuth,
						words,
						updateUserWord,
						audioHandler,
						baseUrl,
						addWordToUser,
					}}
				/>
			) : (
				<div className='spinner-border text-info' role='status'>
					<span className='sr-only'>Loading...</span>
				</div>
			)}
		</>
	);
}

export default WordList;

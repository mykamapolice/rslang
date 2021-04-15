import React from 'react';
import WordCardHOC from './WordCardsHOC';

function WordCard({ mappedWords }: any): JSX.Element {
	return (
		<div className='container-fluid'>
			<div className='d-sm-flex p-2 flex-wrap justify-content-center'>
				{mappedWords}
			</div>
		</div>
	);
}

export default WordCardHOC(WordCard);

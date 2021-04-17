import React from 'react';
import WordCardHOC from '../HOC/WordCardsHOC';
import { EmojiSmileUpsideDown } from 'react-bootstrap-icons';
import './WordCards.css'

function WordCard({ mappedWords }: any): JSX.Element {
	return (
		<div className='d-flex container-fluid' style= {{ flexGrow: 1,
			minHeight: '100%'}}>
			<div className='d-flex p-2 flex-wrap justify-content-center' style = {{flexGrow:1, minHeight:'100%'}}>
				{ mappedWords }
				
				<div className={`notWords ${mappedWords.length ?'':'b-show'}`}>
					<h1 className='my-3' style={{color:'#355070'}}>
						В данном разделе пока нет слов. Играйте в игры, или добавляйте слова из учебника
					</h1>
				<EmojiSmileUpsideDown color="#6d597a" style={{alignSelf:'center'}} size={120}/>
				</div>
			</div>
		</div>
	);
}

export default WordCardHOC(WordCard);

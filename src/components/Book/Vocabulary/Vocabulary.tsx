import React, { useMemo } from 'react';
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {IWord} from '../../../interfaces'
import WordCards from '../WordCards/WordCards';

const audio = new Audio();
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

interface IVocabulary {
	userId:string|null;
	vMode:boolean;
	value:0|1|2;
	isAuth:boolean;
	token?:string|null;
	setValue:any;
	addWordToUser:any;
	updateUserWord:any;
	audioHandler:any;
	baseUrl:string;
}

function Vocabulary({
	vMode,
	value,
	isAuth,
	setValue,
	addWordToUser,
	updateUserWord,
	audioHandler,
	baseUrl,
}: IVocabulary): JSX.Element {
	const state: any = useSelector(state => state);
	const dispatch = useDispatch();
	const { userList,page,lvl } = state.vocabulary;

	const filteredWords = useMemo(
		() =>
			userList
				? userList.filter((el: IWord) =>{
					console.log(value)
						if(wordMapperCheck(value, el.userWord.optional)&&el.group===lvl)return el
					}
				  ).filter((el:IWord, i:number, arr:IWord[])=>{
						console.log(arr)
						const startIndex = Math.ceil(arr.length/(arr.length/20)*page);						
					if(i>=startIndex && i<startIndex+20) return el
					})
				: [],
		[userList, value, page, lvl, isAuth]
	);
  console.log(filteredWords);

	return (
		<div className='Vocabulary'>
			<ToggleButtonGroup
				size='lg'
				type='radio'
				name='options'
				defaultValue={value}
			>
				<ToggleButton
					variant='primary'
					value={0}
					onClick={(e: any) => dispatch(setValue(+e.target.value))}
				>
					Изучаемые слова
				</ToggleButton>
				<ToggleButton
					variant='primary'
					value={1}
					onClick={(e: any) => dispatch(setValue(+e.target.value))}
				>
					Сложные слова
				</ToggleButton>
				<ToggleButton
					variant='primary'
					value={2}
					onClick={(e: any) => dispatch(setValue(+e.target.value))}
				>
					Удалённые слова
				</ToggleButton>
			</ToggleButtonGroup>
			<div className='container-fluid'>
				<div className='d-sm-flex p-2 flex-wrap justify-content-center'>
					<WordCards
						addWordToUser={addWordToUser}
						vMode={vMode}
						value={value}
						isAuth={isAuth}
						words={filteredWords}
						updateUserWord={updateUserWord}
						audioHandler={audioHandler}
						baseUrl={baseUrl}
					/>
				</div>
			</div>
		</div>
	);
}

export default Vocabulary;

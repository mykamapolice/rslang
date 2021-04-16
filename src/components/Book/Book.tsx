import React, { useCallback, useEffect } from 'react';
import { IRootState } from '../../interfaces';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Wrench } from 'react-bootstrap-icons';
import {
	createWord,
	fetchingAggregated,
	fetchingGeneral,
	updateWord,
	setLvl,
	setPage,
	setValue,
	vModeToggle,
	vModeSetOff,
	fetchingOnBookStart,
} from '../../redux/reducers/vocabulary';
import { baseUrl } from '../../utils/constants';
import Lvl from './Lvl/Lvl';
import WordListPages from './Pagination/WordListPages';
import VocabularyPages from './Pagination/VocabularyPages';
import WordList from './WordList/WordList';
import Vocabulary from './Vocabulary/Vocabulary';
import Games from './Games/Games';
import WordListFilter from './HOC/WordListFilter';
import UserListFilter from './HOC/UserListFilter';

const WordListGames = WordListFilter(Games);
const UserListGames = UserListFilter(Games);

const images: string[] = [
	`${process.env.PUBLIC_URL}/images/1.png`,
	`${process.env.PUBLIC_URL}/images/2.jpg`,
	`${process.env.PUBLIC_URL}/images/3.png`,
	`${process.env.PUBLIC_URL}/images/4.png`,
	`${process.env.PUBLIC_URL}/images/5.gif`,
	`${process.env.PUBLIC_URL}/images/6.png`,
];
const levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const audio: HTMLAudioElement = new Audio();

function Book(): JSX.Element {
	const dispatch = useDispatch();
	const vocabulary = useSelector((state: IRootState) => state.vocabulary);
	const user = useSelector((state: IRootState) => state.user);
	const { vMode, page, lvl, words, userList, value } = vocabulary;
	const { userId, token, isAuth } = user;

	const radioButtonHandler = async () => {
		//	await dispatch(clearWords());
		if (isAuth && !userList)
			await dispatch(fetchingOnBookStart({ lvl, page, userId, token }));
		else {
			//isAuth && (await dispatch(getWords({ userId, token })));
			isAuth
				? await dispatch(fetchingAggregated({ lvl, page, userId, token }))
				: await dispatch(fetchingGeneral({ lvl, page, isAuth }));
		}
	};

	useEffect(() => {
			dispatch(vModeSetOff(isAuth));
	}, [isAuth]);

useEffect(()=>{
	radioButtonHandler();
},[lvl,page,vMode])

	const addWordToUser = async (wordId: string, type: any) => {
		const obj = {
			userId,
			wordId,
			token,
			word: { optional: { ...type, isExist: true, wins: 0, loses: 0 } },
		};

		await dispatch(createWord(obj));
	};

	const updateUserWord = async (wordId: string, type: any) => {
		const obj = {
			userId,
			wordId,
			token,
			type,
		};
		await dispatch(updateWord(obj));
	};

	const audioHandler = useCallback(
		(src: string[], i: number): void => {
			if (i == src.length) return;
			audio.src = `${baseUrl}${src[i]}`;
			audio.play();
			audio.addEventListener(
				'ended',
				() => {
					audioHandler(src, i + 1);
				},
				{ once: true }
			);
		},
		[audio]
	);

	return (
		<div
			className='Vocabulary'
			style={{
				// minHeight: 'calc(100vh - 50px)',
				backgroundImage: `url(${images[lvl]})`,
				backgroundSize:'auto auto',
				backgroundPosition: `bottom 10px right ${300*page}px`,
				transition:'background 1s ease-out'
			}}
		>
			<div className='container-fluid'>
				<div className='row mt-2 '>
					{vMode ? <UserListGames /> : <WordListGames />}

					<div className='col-lg-6 py-3'>
						<div className='d-flex flex-wrap justify-content-center'>
							<Lvl
								levels={levels}
								lvl={lvl}
								setLvl={(n: number) => dispatch(setLvl(n))}
							/>
							{vMode ? (
								<VocabularyPages
									value={value}
									vMode={vMode}
									lvl={lvl}
									page={page}
									userList={userList}
									setPage={(n: number) => dispatch(setPage(n))}
								/>
							) : (
								<WordListPages
									value={value}
									vMode={vMode}
									lvl={lvl}
									page={page}
									userList={userList}
									setPage={(n: number) => dispatch(setPage(n))}
								/>
							)}
						</div>
					</div>
					<div className='d-flex py-3 col justify-content-around'>
						{isAuth && (
							<Button
								style={{ width: '140px' }}
								className='buttonMarginer'
								size='lg'
								title='Cловарь'
								variant='info'
								onClick={() => dispatch(vModeToggle())}
							>
								{vMode ? 'В учебник' : 'В словарь'}
							</Button>
						)}
						<NavLink style={{ display: 'block' }} to='/settings'>
							<Button
								className='py-3 buttonMarginer d-flex justify-content-center align-items-center'
								size='lg'
							>
								<Wrench color='yellow' size={20} />
							</Button>
						</NavLink>
					</div>
				</div>
			</div>
			<div className='container-fluid'>
				<div className='d-flex p-2 flex-wrap justify-content-center'>
					{vMode ? (
						<Vocabulary
							isAuth={isAuth}
							value={value}
							vMode={vMode}
							token={token}
							userId={userId}
							updateUserWord={updateUserWord}
							audioHandler={audioHandler}
							baseUrl={baseUrl}
							addWordToUser={addWordToUser}
							setValue={setValue}
						/>
					) : (
						<WordList
							isAuth={isAuth}
							vMode={vMode}
							token={token}
							words={words}
							updateUserWord={updateUserWord}
							audioHandler={audioHandler}
							baseUrl={baseUrl}
							addWordToUser={addWordToUser}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

export default Book;

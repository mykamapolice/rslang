import React, { useCallback, useEffect, useRef } from 'react';
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
import { tokenRefresh } from '../../redux/reducers/user';
import { baseUrl,publicFolder } from '../../utils/constants';
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
	`${publicFolder}/images/1.png`,
	`${publicFolder}/images/2.jpg`,
	`${publicFolder}/images/3.png`,
	`${publicFolder}/images/4.png`,
	`${publicFolder}/images/5.gif`,
	`${publicFolder}/images/6.png`,
];
const levels: string[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

const audio: HTMLAudioElement = new Audio();

function Book(): JSX.Element {
	const dispatch = useDispatch();
	const vocabulary = useSelector((state: IRootState) => state.vocabulary);
	const user = useSelector((state: IRootState) => state.user);
	const { vMode, page, lvl, words, userList, value } = vocabulary;
	const { userId, token, isAuth, tokenDate, refreshToken } = user;
	const { soundVolume } = useSelector((state: any) => state.settings);
	const didMount = useRef(false);
	const radioButtonHandler = async () => {
		if (isAuth && !userList)
			await dispatch(fetchingOnBookStart({ lvl, page, userId, token }));
		else {
			isAuth
				? await dispatch(fetchingAggregated({ lvl, page, userId, token }))
				: await dispatch(fetchingGeneral({ lvl, page, isAuth }));
		}
	};

	useEffect(() => {
		const diff = tokenDate
			? Math.floor(Date.now() / 1000 / 60 / 60) - tokenDate
			: 0;
		if (diff >= 3) {
			dispatch(tokenRefresh({ userId, refreshToken }));
		} else radioButtonHandler();
	}, [lvl, page, isAuth, tokenDate]);

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
			audio.volume = soundVolume;
			audio.play();
			audio.addEventListener(
				'ended',
				() => {
					audioHandler(src, i + 1);
				},
				{ once: true }
			);
		},
		[soundVolume]
	);

	return (
		<div
			className='Book'
			style={{
				backgroundImage: `url(${images[lvl]})`,
				backgroundSize: 'auto auto',
				backgroundPosition: `bottom 0px right ${300 * page}px`,
				transition: 'background 1s ease-out',
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
							{...{ updateUserWord, audioHandler, addWordToUser, setValue }}
						/>
					) : (
						<WordList {...{ updateUserWord, audioHandler, addWordToUser }} />
					)}
				</div>
			</div>
		</div>
	);
}

export default Book;

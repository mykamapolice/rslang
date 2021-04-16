import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Games({filteredWords}:any): JSX.Element {

	const { value } = useSelector((state:any) => state.vocabulary)

	return (
		<div className='col py-3' style={{visibility : value!==2 ? 'visible':'hidden' }}>
			<NavLink
				to={{
					pathname: '/mini-games/savannah',
					state: { game: 'Savannah', bookWords: filteredWords },
				}}
			>
				<Button title='саванна' variant='primary'>
					Саванна
				</Button>
			</NavLink>
			<NavLink
				to={{
					pathname: '/mini-games/audiocall',
					state: { game: 'Audiocall', bookWords: filteredWords },
				}}
			>
				<Button title='аудиовызов' variant='secondary'>
					Аудиовызов
				</Button>
			</NavLink>

			<Button title='Спринт' variant='success'>
				Спринт
			</Button>
			<NavLink
				to={{
					pathname: '/mini-games/swojaIgra',
					state: { game: 'SwojaIgra', bookWords: filteredWords },
				}}
			>
				<Button title='Своя Игра' variant='primary'>
					Своя Игра
				</Button>
			</NavLink>
		</div>
	);
}

export default Games;

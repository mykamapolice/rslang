import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

function Games({filteredWords}:any): JSX.Element {

	
console.log(filteredWords)
	return (
		<div className='col'>
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
			<Button title='аудиовызов' variant='secondary'>
				Аудиовызов
			</Button>
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

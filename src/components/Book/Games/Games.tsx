import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const games = [
	{
		title:'Savannah',
		pathname:'/mini-games/savannah',
		variant:'primary',
		name:'Саванна'
	},
	{
		title:'Audiocall',
		pathname:'/mini-games/audiocall',
		variant:'secondary',
		name:'Аудиовызов'
	},
	{
		title:'Sprint',
		pathname:'/mini-games/sprint',
		variant:'success',
		name:'Cпринт'
	},
	{
		title:'SwojaIgra',
		pathname:'/mini-games/swojaIgra',
		variant:'primary',
		name:'Swoja Igra'
	}
]

function Games({filteredWords}:any): JSX.Element {

	const { value } = useSelector((state:any) => state.vocabulary)

	return (
		<div className='col py-3 animated' style={{visibility : value!==2&&filteredWords.length ? 'visible':'hidden' }}>
			{games.map((el:any)=>{
				return (
					<NavLink key={el.title}
				to={{
					pathname: el.pathname,
					state: { game: el.title, bookWords: filteredWords },
				}}
			>
				<Button title={el.name} variant={el.variant}>
				{el.name}
				</Button>
			</NavLink>
				)
			})

	}
		</div>
	)
}

export default Games;

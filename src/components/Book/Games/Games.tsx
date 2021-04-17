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

	const { value, vMode } = useSelector((state:any) => state.vocabulary)
	console.log(filteredWords)
	const check = (vMode&&value==2)||!filteredWords.length ? false:true
	return (
		<div className='col py-3 animated' style={{visibility : check ? 'visible':'hidden' }}>
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

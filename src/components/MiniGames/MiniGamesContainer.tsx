import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import './MiniGamesContainer.css';
import { NavLink } from 'react-router-dom';

const games = [
	{
		id: 'savannah',
		title: 'Savannah',
		imageUrl: 'https://cdn.htmlgames.com/AfricanSavannah/img/menu_back.jpg',
	},
	{
		id: 'audiocall',
		title: 'Audiocall',
		imageUrl:
			'https://static01.nyt.com/images/2013/08/30/technology/personaltech/GW-Plantronics-RIG/GW-Plantronics-RIG-superJumbo.jpg',
	},

	{
		id: 'sprint',
		title: 'Sprint',
		imageUrl: 'http://m.plonga.com/uploads/thumbs/100-meters-sprint-mobile.jpg',
	},
	{
		id: 'swojaIgra',
		title: 'SwojaIgra',
		imageUrl:
			'https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/new_nintendo_3ds_download_software_2/H2x1_N3DSDS_MomHidMyGame_image1600w.jpg',
	},
];

function MiniGamesContainer(): JSX.Element {
	const onGameClickHandler = (e: React.MouseEvent<HTMLElement>) => {

	};

	return (
		<div className='MiniGames'>
			<div className='d-flex flex-wrap justify-content-center align-items-center'>
				{games.map((g, i) => (
					<Card
						className='card-game m-3'
						data-game={g.id}
						key={i}
						onClick={onGameClickHandler}
					>
						<NavLink
							key={g.id}
							to={{
								pathname: `/mini-games/${g.id}`,
								state: { game: `${g.title}` },
							}}
						>
							<Card.Img variant='top' src={g.imageUrl} />
							<Card.Body>
								<Card.Title>{g.title}</Card.Title>
							</Card.Body>
						</NavLink>
					</Card>
				))}
			</div>
		</div>
	);
}

export default MiniGamesContainer;

import React from 'react';
import { Card, CardDeck } from 'react-bootstrap';
import './MiniGamesContainer.css';
import { Link } from 'react-router-dom';
import { SprintGame } from './SprintGame';

const games = [
    {
        id: 'savannah',
        title: 'Savannah',
        imageUrl: 'https://cdn.htmlgames.com/AfricanSavannah/img/menu_back.jpg',
    },
    {
        id: 'audiocall',
        title: 'Audio Call',
        imageUrl: 'https://static01.nyt.com/images/2013/08/30/technology/personaltech/GW-Plantronics-RIG/GW-Plantronics-RIG-superJumbo.jpg',
    },

    {
        id: 'sprint',
        title: 'Sprint',
        imageUrl: 'http://m.plonga.com/uploads/thumbs/100-meters-sprint-mobile.jpg',
    },
    {
        id: 'mygame',
        title: 'My Game',
        imageUrl: 'https://cdn02.nintendo-europe.com/media/images/10_share_images/games_15/new_nintendo_3ds_download_software_2/H2x1_N3DSDS_MomHidMyGame_image1600w.jpg',
    },
];

function MiniGamesContainer(): JSX.Element {

    const onGameClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        console.log('savannah click', e.currentTarget.dataset.game);
    };

    return <div className="MiniGames">
        <CardDeck className="col-sm-12 mt-4">
            <SprintGame />
            {/* {games.map((g, i) => (
                <Card className="card-game col-sm-3" data-game={g.id} key={i} onClick={onGameClickHandler}>
                    <Link key={g.id} to={`/mini-games/${g.id}`}>
                        <Card.Img variant="top" src={g.imageUrl} />
                        <Card.Body>
                            <Card.Title>{g.title}</Card.Title>
                        </Card.Body>
                    </Link>
                </Card>
            ))} */}
        </CardDeck>
    </div>;
}

export default MiniGamesContainer;

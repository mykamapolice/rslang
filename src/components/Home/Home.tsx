import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import AdvantagesContainer from './Advantages/Advantages';
import './Home.css';
import VideoContainer from './VideoContainer/VideoContainer';


function Home() {
	return (
		<>
			<Jumbotron className={'home-container'} fluid>
				<div>
					Уникальное приложение для изучения английского. Увлекательные игры для
					тренировки слов и запоминания их употребления в предложениях
				</div>
				<Button variant='primary'>Начать!</Button>
			</Jumbotron>
			<AdvantagesContainer />
			<VideoContainer />
		</>
	);
}

export default Home;

import React from 'react'
import { Button, Jumbotron } from 'react-bootstrap'
import './Home.css'

function Home() {
    return (
        <Jumbotron className={'home-container'} fluid>
            <div>
                Уникальное приложение для изучения английского. Увлекательные игры для тренировки слов и запоминания их
                употребления в предложениях
            </div>
            <Button variant="primary">Начать!</Button>
        </Jumbotron>
    )
}

export default Home

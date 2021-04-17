import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import './Advantages.css'

function AdvantagesContainer() {
const scrollHandler = () =>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

    return (
        <div className={'d-flex justify-content-center flex-wrap'}>
            <Card className={'advantage'} style={{backgroundImage:"url('https://res.cloudinary.com/dygjvygpr/image/upload/v1618509451/ebook_laog6e.jpg')"}}>
                <Card.Body>
                    <Card.Title>Электронный учебник</Card.Title>
                    <Card.Text>
                        Электронный учебник содержит в себе слова для изучения, с возможностью воспроизведения, удаления
                        и сохранения слов
                    </Card.Text>

                </Card.Body>
                <NavLink onClick={scrollHandler} to='/book'><Button variant="primary">К учебнику</Button></NavLink>
            </Card>
            <Card className={'advantage'} style={{backgroundImage:"url('https://res.cloudinary.com/dygjvygpr/image/upload/v1618509367/statistics_j9ug5l.jpg')"}}>
                <Card.Body>
                    <Card.Title>Статистика прогресса</Card.Title>
                    <Card.Text>
                        В приложении отображается статистика по каждой игре за сутки,а также за всё время, проведённое в игре.
                    </Card.Text>
                </Card.Body>
                <NavLink to='/statistics'><Button variant="primary">К статистике</Button></NavLink>

            </Card>
            <Card className={'advantage'} style={{backgroundImage:"url('https://res.cloudinary.com/dygjvygpr/image/upload/v1618508912/games_vvcn3p.jpg')"}}>
                <Card.Body>
                    <Card.Title>Игры</Card.Title>
                    <Card.Text>
                        Игры способствуют лучшему запоминанию и изучению любой информации. Мы подготовили 4 игры для
                        успешного обучения
                    </Card.Text>
                </Card.Body>
                <NavLink  to='/mini-games'>  <Button variant="primary">К играм</Button> </NavLink>

            </Card>
        </div>
    )
}

export default AdvantagesContainer

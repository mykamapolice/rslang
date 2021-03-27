import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Button, Jumbotron } from 'react-bootstrap';
import './Home.css';
import { registration } from '../../redux/reducers/user';
import { IUserRegistration } from '../../interfaces';



function Home() {
    const userTest = {
        password: "12345678",
        email: "vasya2@user.com",
        name: 'vasya11111',
    }

    const user = useSelector(user => user);
    const dispatch = useDispatch();
    console.log(user);

    const regist = (user: IUserRegistration) => {
        dispatch(registration(user))
    }

    return (
        <Jumbotron fluid>
            <h1>Hello, world!</h1>
            <p>
                This is a simple hero unit, a simple jumbotron-style component
                for calling extra attention to featured content or information.
            </p>
            <p>
                <Button variant="primary" onClick={() => regist(userTest)}>Learn more</Button>
            </p>
        </Jumbotron >
    );
}

export default Home;

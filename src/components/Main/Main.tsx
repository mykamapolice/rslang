import React, {useEffect, useRef} from 'react'
import { Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { vModeSetOff } from '../../redux/reducers/vocabulary';
import { logout, tokenRefresh } from '../../redux/reducers/user';
import { tokenLifetime, publicFolder } from '../../utils/constants';
import Home from '../Home/Home'
import Book from '../Book/Book'
import MiniGamesContainer from '../MiniGames/MiniGamesContainer'
import Settings from '../Settings/Settings'
import Statistics from '../Statistics/Statistics'
import Team from '../Team/Team'
import MiniGamesStartMenu from '../MiniGames/MiniGameStartMenu/MiniGamesStartMenu'
import './Main.css';

export enum miniGames {
    SwojaIgra = 'SwojaIgra',
    Savannah = 'Savannah',
    Audiocall = 'Audiocall',
    Sprint = 'Sprint'
}

function Main(): JSX.Element {
const dispatch = useDispatch();
const { isAuth, userId, refreshToken, tokenDate } = useSelector((state:any) => state.user );
const didMount = useRef(false);

useEffect(() => {
const diff = Math.ceil(Date.now()/1000/60/60) - tokenDate;
console.log(diff);
if(diff===tokenLifetime)dispatch(tokenRefresh({userId, refreshToken}));
else if(diff>tokenLifetime){
    dispatch(logout());
}
else{
 if(didMount.current)dispatch(vModeSetOff(isAuth));
 else didMount.current=true;
}
}, [isAuth])
    return (
        <div className="Main" style={{backgroundImage: `url(${publicFolder}/bg.png)`}}>

            <Route path="/book" component={Book}/>
            <Route exact path="/mini-games" component={MiniGamesContainer}/>
            <Route exact path="/mini-games/savannah" component={MiniGamesStartMenu}/>
            <Route exact path="/mini-games/swojaIgra" component={MiniGamesStartMenu}/>
            <Route exact path="/mini-games/audiocall" component={MiniGamesStartMenu}/>
            <Route exact path="/mini-games/sprint" component={MiniGamesStartMenu}/>
            <Route path="/statistics" component={Statistics}/>
            <Route path="/team" component={Team}/>
            <Route path="/settings" component={Settings}/>
            <Route exact path="/" component={Home}/>
           
        </div>
    )
}

export default Main

import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../Home/Home';
import Learning from '../Learning/Learning';
import MiniGamesContainer from '../MiniGames/MiniGamesContainer';
import Settings from '../Settings/Settings';
import Statistics from '../Statistics/Statistics';
import Team from '../Team/Team';
import Vocabulary from '../Vocabulary/Vocabulary';
import MiniGame from '../MiniGames/MiniGame'
import SavannahGame from '../MiniGames/SavannahGame'

function Main(): JSX.Element {
  return (
        <div className="Main">
                    <Route path="/learning" component={Learning} />
                    <Route exact path="/mini-games" component={MiniGamesContainer} />
                    {/*<Route exact path="/mini-games/:id" component={MiniGame} />*/}
                    <Route exact path="/mini-games/savannah" component={SavannahGame} />
                    <Route path="/vocabulary" component={Vocabulary} />
                    <Route path="/statistics" component={Statistics} />
                    <Route path="/team" component={Team} />
                    <Route path="/settings" component={Settings} />
                    <Route exact path="/" component={Home} />
        </div>
  );
}

export default Main;

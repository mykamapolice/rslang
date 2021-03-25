import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Learning from '../Learning/Learning';
import MiniGames from '../MiniGames/MiniGames';
import Settings from '../Settings/Settings';
import Statistics from '../Statistics/Statistics';
import Team from '../Team/Team';
import Vocabulary from '../Vocabulary/Vocabulary';

function Main(): JSX.Element {
  return (
        <div className="Main">
                <Route path="/learning" component={Learning} />
                <Route path="/mini-games" component={MiniGames} />
                <Route path="/vocabulary" component={Vocabulary} />
                <Route path="/statistics" component={Statistics} />
                <Route path="/team" component={Team} />
                <Route path="/settings" component={Settings} />
                <Route exact path="/" component={Home} />
        </div>
  );
}

export default Main;

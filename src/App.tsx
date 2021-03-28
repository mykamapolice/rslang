import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Main from './components/Main/Main';

function App(): JSX.Element {
  return (
        <div
          className="App"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
            <Header />
            <Main />
            <Footer />
        </div>
  );
}

export default App;

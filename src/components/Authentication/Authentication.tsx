import React, { FC, useEffect, useState } from 'react';
import LogIn from './LogIn';
import Registration from './Registration';
import { Button } from 'react-bootstrap';

const Authentication: FC = (): JSX.Element => {
  console.log('hi')

  const userName = (localStorage.getItem('name'));
    const [name, setName] = useState(userName);
    const [loggedIn, setloggedIn] = useState(false);

    useEffect(() => {
      if (userName !== null) {
        setloggedIn(true);
      } else {
        setloggedIn(false);
      }
    }, []);

    const onLogOutButtonClick = () => {
      localStorage.clear();
      setloggedIn(false);
    };

    return (<div>
      {loggedIn
        ?
        <div>Вечер в хату{'  '}<Button variant='danger' onClick={onLogOutButtonClick}>Выйти</Button>
        </div>
        : <div>
          <LogIn setloggedIn={setloggedIn} />
          {'  '}
          <Registration />
        </div>
      }

    </div>);
  }

export default Authentication;

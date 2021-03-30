import React, { FC, useEffect, useState } from 'react';
import LogIn from './LogIn';
import Registration from './Registration';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../redux/reducers/user';

const Authentication: FC = (): JSX.Element => {

  const userName = (localStorage.getItem('name'));
    const [name, setName] = useState(userName);

    const dispatch = useDispatch()
    const state:any = useSelector(state => state);
    const { isAuth } = state.user


    const onLogOutButtonClick = () => {
      localStorage.clear();
      dispatch(logout())
    };

    return (<div>
      {isAuth
        ?
        <div>Вечер в хату{'  '}<Button variant='danger' onClick={onLogOutButtonClick}>Выйти</Button>
        </div>
        : <div>
          <LogIn isAuth={isAuth}/>
          {'  '}
          <Registration />
        </div>
      }
    </div>);
  }

export default Authentication;

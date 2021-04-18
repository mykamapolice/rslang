import React, { FC, useEffect, useState } from 'react';
import LogIn from './LogIn';
import Registration from './Registration';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/user';
import { IRootState } from '../../interfaces';

const Authentication: FC = (): JSX.Element => {

  const dispatch = useDispatch();
  const user = useSelector((state: IRootState) => state.user);
  const { isAuth, name, photoUrl } = user;

  const onLogOutButtonClick = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (<div className={'authentication'}>
    {isAuth
      ?
      <div>
        <img
          style={{ width: "3rem", borderRadius: "50%", marginRight: "1rem", height: "3rem" }}
          src={photoUrl}
          alt='[eq' />Вечер в хату, {name}
        <Button style={{ marginLeft: "0.5rem" }} variant='danger' onClick={onLogOutButtonClick}>Выйти</Button>
      </div>
      :
      <div>
        <LogIn isAuth={isAuth} />
        {'  '}
        <Registration />
      </div>
    }
  </div>);
};

export default Authentication;

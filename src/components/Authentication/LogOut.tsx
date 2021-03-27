import React from 'react';
import { Button } from 'react-bootstrap';

const LogOut = () => {
  const onLogOutButtonClick = () => {
    console.log('выход')
  }
  return  <Button variant="primary" onClick={onLogOutButtonClick}>Выйти</Button>
}

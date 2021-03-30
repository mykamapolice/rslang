import React, { FC, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { loginUser } from '../../utils/user-helper'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducers/user';

const LogIn = (props: any): JSX.Element => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();

  const handleEmailChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const mail = event.target.value
    setEmail(mail)
  }
  const handlePasswordChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    const pass = event.target.value
    setPassword(pass)
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit =  async (event:React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    const user = {
      email,
      password
    };

    setValidated(true);
    const form: any = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
      await dispatch(login(user));
      handleClose()
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Войти
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Введите данные для входа</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Почта</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} required/>
              <Form.Control.Feedback type="invalid">
                Введите корректную почту
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required/>
              <Form.Control.Feedback type="invalid">
                Введите пароль
              </Form.Control.Feedback>
            </Form.Group>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <Button variant="primary" type="submit" >
                Отправить
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Закрыть
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LogIn

import React, { FC, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../redux/reducers/user';

const Registration: FC = (): JSX.Element => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch()
  const state:any = useSelector(state => state);

  const handleEmailChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }
  const handleNameChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const handlePasswordChange =  (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    const user = {
      password,
      email,
      name
    }
    // if(password.length < 1) {
    //   event.preventDefault()
    //   event.stopPropagation()
    //   return
    // }
    setValidated(true);
    const form: any = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      return
    }
    dispatch(registration(user));

    handleClose()
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Зарегестрироваться
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Регистрация</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={(e:React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Почта</Form.Label>
              <Form.Control  type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} required/>
              <Form.Control.Feedback type="invalid">
                Введите корректную почту
              </Form.Control.Feedback>
              <Form.Text className="text-muted">
                Мы не передадим вашу почту 3 лицам
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Пароль</Form.Label>
              <Form.Control  type="password" placeholder="Password" value={password} onChange={handlePasswordChange} minLength={8} required/>
              <Form.Control.Feedback type="invalid">
                Пароль должен быть больше 8 символов
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Имя</Form.Label>
              <Form.Control type="name" placeholder="Name" value={name} onChange={handleNameChange} required />
              <Form.Control.Feedback type="invalid">
                Введите имя
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

export default Registration

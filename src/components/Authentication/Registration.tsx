import React, { FC, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registration } from '../../redux/reducers/user';
import Axios from 'axios'

const Registration: FC = (): JSX.Element => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [photo, setPhoto]: any  = useState('');
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

  const handleChangeImage = (e: any) => {
    const photo = e.target.files[0]
    console.log(photo.type)

    if(photo.type === "image/png" || photo.type === "image/jpeg") {
      setPhoto(photo)
    }
  }

  const uploadImage = async () => {
    const formData = new FormData()
    formData.append("file", photo)
    formData.append("upload_preset", "ealjihlj")
    try {
      const response = await Axios.post("https://api.cloudinary.com/v1_1/dhp3eaod5/image/upload", formData)
      console.log(response.data.url)
      return (response.data.url)
    } catch (e) {
      return ''
    }
  }

  const handleClose = () => {
    setPhoto('')
    setShow(false);
  }
  const handleShow = () => setShow(true)

  const handleSubmit = async (event:React.FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    setValidated(true)
    const form: any = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
      return
    }

    const photoUrl = await uploadImage()

    const user = {
      password,
      email,
      name,
      photoUrl
    }
    dispatch(registration(user))

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
            <Form.Group>
              <Form.File
                name="file"
                label="Фоточка(jpeg, png)"
                onChange={handleChangeImage}
                feedbackTooltip
              />
              <Form.Control.Feedback type="invalid">
                Введите имя
              </Form.Control.Feedback>
            </Form.Group>
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
              <Button variant="primary" type="submit" >
                Отправить
              </Button>
              <button onClick={uploadImage}>upload image</button>
              <button onClick={() => {console.log(photo)}}>check image</button>
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

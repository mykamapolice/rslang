import axios from 'axios';
import {
  IUserRegistration,
  IUserAuthData
} from '../interfaces';

const urlSignUp = 'https://rs-lang-rs-team-41.herokuapp.com/users'
const urlSignIn = 'https://rs-lang-rs-team-41.herokuapp.com/signin'

export const createUser = async (user: IUserRegistration) => {
  const response = await axios.post(
    urlSignUp,
    user,
  );
  return response.data;
};

export const loginUser = async (user: IUserAuthData) => {
  const response = await axios.post(
    urlSignIn,
    user,
  );
  await setItemsInLocalStorage(response.data);

  return response.data;
}

function setItemsInLocalStorage(value: any) {

  const token = value.token

  const userName = value.name

  const userID = value.userId

  localStorage.setItem('token', JSON.stringify(token))
  localStorage.setItem('name', JSON.stringify(userName))
  localStorage.setItem('id', JSON.stringify(userID))
}

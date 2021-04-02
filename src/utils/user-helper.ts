import axios from 'axios';
import { baseUrl } from '../utils/constants'
import { IUserRegistration, IUserAuthData } from '../interfaces';


export const createUser = async (user: IUserRegistration) => {
  try {
    const response = await axios.post(`${baseUrl}users`, user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (user: IUserAuthData) => {
  let response;
  try {
    response = await axios.post(`${baseUrl}signin`, user);

    await setItemsInLocalStorage(response.data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
}

  function setItemsInLocalStorage(value: any) {
    const token = value.token;
    const userName = value.name;
    const userID = value.userId;

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('name', JSON.stringify(userName));
    localStorage.setItem('id', JSON.stringify(userID));
  }

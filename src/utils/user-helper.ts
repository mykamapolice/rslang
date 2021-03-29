import axios from 'axios';
import { IUserRegistration, IUserAuthData } from '../interfaces';

const baseUrl = 'https://rs-lang-rs-team-41.herokuapp.com';

export const createUser = async (user: IUserRegistration) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, user);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (user: IUserAuthData) => {
  let response;

  try {
    response = await axios.post(`${baseUrl}/signin`, user);

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

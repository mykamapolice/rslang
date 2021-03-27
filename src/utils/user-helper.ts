import axios from 'axios';
import {
  IUserRegistration, 
  IUserAuthData 
} from '../interfaces';

const url = 'https://rs-lang-rs-team-41.herokuapp.com/users'

export const createUser = async (user: IUserRegistration) => {
  const response = await axios.post(
    url,
    user,
  );

  return response.data;
};

export const loginUser = async (user: IUserAuthData) => {
  const response = await axios.post(
    url,
    user,
  );

  return response.data;
}
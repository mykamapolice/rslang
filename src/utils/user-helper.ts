import axios from 'axios';
import { baseUrl } from '../utils/constants';
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
};

export const getNewToken = async ({userId,refreshToken}:any) => {
	const headers = {
		Authorization: `Bearer ${refreshToken}`,
		Accept: 'application/json'
	};
	try {
		const response = await axios.get(
			`${baseUrl}users/${userId}/tokens`,
			{ headers }
		);
    await setItemsInLocalStorage(response.data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
}



function setItemsInLocalStorage(value: any) {
  const token = value.token;
  const userName = value.name;
  const userID = value.userId;
  const photoUrl = value.photoUrl;
  const refreshToken = value.refreshToken
  const tokenDate = Math.floor(Date.now()/1000/60/60);
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
  localStorage.setItem('tokenDate', JSON.stringify(tokenDate));
  if(userID&&photoUrl&&userName){
  localStorage.setItem('name', JSON.stringify(userName));
  localStorage.setItem('id', JSON.stringify(userID));
  localStorage.setItem('photoUrl', JSON.stringify(photoUrl));
}

}

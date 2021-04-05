import axios from 'axios';
import { InferThunkActionCreatorType } from 'react-redux';
import { IGameResult } from '../interfaces';
import { changeActionStat } from '../redux/reducers/statistics';

const baseUrl = 'https://rs-lang-rs-team-41.herokuapp.com';

const getAxiosOptions = () => {
  const userId: any = localStorage.getItem('id');
  const token: any = localStorage.getItem('token');

  const url = `${baseUrl}/users/${JSON.parse(userId)}/statistics`;
  const headers = {
    Authorization: `Bearer ${JSON.parse(token)}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return { url, headers };
};

export const getTodaysDate = (): number => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  return new Date(`${year}-${month}-${day} 00:00:00`).getTime();
};

export const fetchStatistics = async () => {
  const { url, headers } = getAxiosOptions();

  try {
    const response = await axios.get(url, { headers });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const upsertStatistics = async (result: IGameResult, thunkAPI: any) => {
  const { url, headers } = getAxiosOptions();
  const { dispatch, getState } = thunkAPI;

  dispatch(changeActionStat('goooooo'));

  console.log('upsertStatistics');
  // console.log(thunkAPI);

  const { statistics } = thunkAPI.getState();

  console.log('state', statistics);

  // thunkAPI

  // try {
  //   const response = await axios.put(url, result, { headers });

  //   return response.data;
  // } catch (error) {
  //   console.log(error);
  // }
};

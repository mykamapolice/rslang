import { baseUrl } from './constants';
import axios from 'axios';


export const fetchingGeneralVocabulary = async ({lvl,page}:any) => {
  try {
    const response = await axios.get(`${baseUrl}words?page=${page}&group=${lvl}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createUserWord = async ({ userId, wordId, word, token }:any) => {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  try {
    const response = await axios.post(`${baseUrl}users/${userId}/words/${wordId}`,JSON.stringify(word),{headers});
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserWords = async ({ userId, token }:any) => {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  }
  try {
    const response = await axios.get(`${baseUrl}users/${userId}/aggregatedWords?page=0&wordsPerPage=3600&filter=%7B%22userWord.optional.isExist%22%3A%20%7B%20%22%24eq%22%3Atrue%7D%7D`,{headers});
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserWord = async ({ userId, token, wordId, difficulty }:any) => {
  debugger
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  const word = { 
    "difficulty": `${difficulty}`, 
    "optional": { 
      "isExist": true 
    } 
  };
  try { 
    const response = await axios.put(`${baseUrl}users/${userId}/words/${wordId}`,JSON.stringify(word),{headers});
    console.log(response);
    return response.data;
  } 
  catch (error) {
    console.log(error);
  }
};
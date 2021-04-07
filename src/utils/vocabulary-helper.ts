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
//https://rs-lang-rs-team-41.herokuapp.com/users/60650a3b94d2280015da29c2
export const fetchingAggregatedWords = async ({lvl,page,userId, token}:any) =>{
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  }
  try {
    const response = await axios.get(`${baseUrl}users/${userId}/aggregatedWords?group=${lvl}&page=${page}&wordsPerPage=20`,{headers});
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

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

export const updateUserWord = async ({ userId, token, wordId, type }:any) => {

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  const word = {
    "optional": {
 ...type, "isExist" : true
 //пометить сколько раз слово участвоввало в играх
// пометить сколько раз слово было угадано
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

export const fetchAllWords = async ({userId, token, lvl}: any) => {
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/json',
  }
  try {
    const response = await axios.get(`${baseUrl}users/${userId}/aggregatedWords?page=0&group=${lvl}&wordsPerPage=3600`,{headers});
    console.log('get all', response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

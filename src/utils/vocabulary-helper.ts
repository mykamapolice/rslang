import axios from 'axios';

const baseUrl = 'https://rs-lang-rs-team-41.herokuapp.com';


export const fetchingGeneralVocabulary = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
import { baseUrl } from './constants';
import { IWord } from '../interfaces';
import axios from 'axios';

export const fetchingGeneralVocabulary = async ({ lvl, page }: any) => {
	try {
		const response = await axios.get(
			`${baseUrl}words?page=${page}&group=${lvl}`
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const bookStartFetching = async ({ lvl, page, userId, token }: any) => {
	const headers = {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
	};

	interface IPayload {
		userList: IWord[] | [];
		words: IWord[] | [];
	}
	const payload: IPayload = {
		userList: [],
		words: [],
	};
	try {
		const userWords = await axios.get(
			`${baseUrl}users/${userId}/aggregatedWords?page=0&wordsPerPage=3600&filter=%7B%22userWord.optional.isExist%22%3A%20%7B%20%22%24eq%22%3Atrue%7D%7D`,
			{ headers }
		);
		payload.userList = [...userWords.data[0].paginatedResults];
	} catch (error) {
		console.log(error);
	}
	try {
		const words = await axios.get(
			`${baseUrl}users/${userId}/aggregatedWords?group=${lvl}&page=0&wordsPerPage=20&filter=%7B%20%22page%22%3A%20%7B%20%22%24eq%22%3A%20${page}%20%7D%20%7D`,
			{ headers }
		);
		payload.words = [...words.data[0].paginatedResults];
	} catch (error) {
		console.log(error);
	}
	return payload;
};
export const createUserWord = async ({ userId, wordId, word, token }: any) => {
	const headers = {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};
	try {
		const response = await axios.post(
			`${baseUrl}users/${userId}/words/${wordId}`,
			JSON.stringify(word),
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const fetchingAggregatedWords = async ({
	lvl,
	page,
	userId,
	token,
}: any) => {
	const headers = {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
	};
	try {
		const response = await axios.get(
			`${baseUrl}users/${userId}/aggregatedWords?group=${lvl}&page=0&wordsPerPage=20&filter=%7B%20%22page%22%3A%20%7B%20%22%24eq%22%3A%20${page}%20%7D%20%7D`,
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getUserWords = async ({ userId, token }: any) => {
	const headers = {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
	};
	try {
		const response = await axios.get(
			`${baseUrl}users/${userId}/aggregatedWords?page=0&wordsPerPage=3600&filter=%7B%22userWord.optional.isExist%22%3A%20%7B%20%22%24eq%22%3Atrue%7D%7D`,
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const updateUserWord = async ({ userId, token, wordId, type }: any) => {
	const headers = {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
		'Content-Type': 'application/json',
	};
	const word = {
		optional: {
			...type,
			isExist: true,
			//пометить сколько раз слово участвоввало в играх
			// пометить сколько раз слово было угадано
		},
	};
	try {
		const response = await axios.put(
			`${baseUrl}users/${userId}/words/${wordId}`,
			JSON.stringify(word),
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const fetchAllWords = async ({ userId, token, lvl }: any) => {
	const headers = {
		Authorization: `Bearer ${token}`,
		Accept: 'application/json',
	};
	try {
		const response = await axios.get(
			`${baseUrl}users/${userId}/aggregatedWords?page=0&group=${lvl}&wordsPerPage=3600`,
			{ headers }
		);
		console.log('get all', response.data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

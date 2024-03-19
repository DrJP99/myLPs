import axios from 'axios';
import { getToken } from './users';
import serverUrl from '../utils/url.js';

const baseUrl = `${serverUrl}/api/records`;

const getAll = async () => {
	const request = axios.get(baseUrl);
	const response = await request;
	return response.data;
};

const getOne = async (id) => {
	const request = axios.get(`${baseUrl}/${id}`);
	const response = await request;
	return response.data;
};

const create = async (newObject) => {
	const config = {
		headers: {
			Authorization: getToken(),
			'Content-Type': 'multipart/form-data',
		},
	};
	const res = await axios.post(baseUrl, newObject, config);
	return res.data;
};

const update = async (id, newObject) => {
	const config = {
		headers: {
			Authorization: getToken(),
			'Content-Type': 'multipart/form-data',
		},
	};
	const res = await axios.put(`${baseUrl}/${id}`, newObject, config);
	return res.data;
};

const deleteOne = async (id) => {
	const config = {
		headers: { Authorization: getToken() },
	};
	const res = await axios.delete(`${baseUrl}/${id}`, config);
	return res;
};

export { getAll, getOne, create, update, deleteOne };

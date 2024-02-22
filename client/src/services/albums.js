import axios from 'axios';
import { getToken } from './users';

const baseUrl = '/api/records';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const getOne = (id) => {
	const request = axios.get(`${baseUrl}/${id}`);
	return request.then((response) => response.data);
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: getToken() },
	};
	const res = await axios.post(baseUrl, newObject, config);
	return res.data;
};

const deleteOne = async (id) => {
	const config = {
		headers: { Authorization: getToken() },
	};
	const res = await axios.delete(`${baseUrl}/${id}`, config);
	return res;
};

export { getAll, getOne, create, deleteOne };

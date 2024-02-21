import axios from 'axios';
const baseUrl = '/api/artists';

export const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

export const getOne = (id) => {
	const request = axios.get(`${baseUrl}/${id}`);
	return request.then((response) => response.data);
};

export const create = async (newObject) => {
	const res = await axios.post(baseUrl, newObject);
	return res.data;
};

import axios from 'axios';
import { getToken } from './users';
const baseUrl = '/api/artists';

export const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

export const getOne = (id) => {
	const request = axios.get(`${baseUrl}/${id}`);
	return request.then((response) => response.data);
};

export const getArtistAlbums = (id) => {
	const request = axios.get(`${baseUrl}/${id}/records`);
	return request.then((response) => response.data);
};

export const create = async (newObject) => {
	const config = {
		headers: { Authorization: getToken() },
	};
	const res = await axios.post(baseUrl, newObject, config);
	return res.data;
};

export const deleteOne = async (id) => {
	const config = {
		headers: { Authorization: getToken() },
	};
	const res = await axios.delete(`${baseUrl}/${id}`, config);
	return res;
};

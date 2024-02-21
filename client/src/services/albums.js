import axios from 'axios';

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
	const res = await axios.post(baseUrl, newObject);
	return res.data;
};

const deleteOne = async (id) => {
	const res = await axios.delete(`${baseUrl}/${id}`);
	return res;
};

export { getAll, getOne, create, deleteOne };

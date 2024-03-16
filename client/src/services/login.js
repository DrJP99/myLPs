import axios from 'axios';
import { serverUrl } from '../utils/url';

const baseUrl = `${serverUrl}/api/login`;

export const login = async (credentials) => {
	const res = await axios.post(baseUrl, credentials);
	return res.data;
};

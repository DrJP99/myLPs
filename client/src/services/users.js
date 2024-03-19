import axios from 'axios';
import { serverUrl } from '../utils/url';

const baseUrl = `${serverUrl}/api/users`;

let token = null;

export const readLocalStorage = async () => {
	const loggedUserToken = window.localStorage.getItem('loggedUserToken');
	if (!loggedUserToken) {
		return null;
	}
	const usr = await validateToken(loggedUserToken);
	if (usr) {
		const userData = {
			token: loggedUserToken,
			username: usr.data.username,
		};
		return userData;
	}
	return null;
};

export const setToken = (newToken) => {
	token = newToken;
};

export const clearUserData = () => {
	setToken(null);
};

export const validateToken = async (tkn) => {
	tkn = `bearer ${tkn}`;
	const token = tkn || getToken();
	const config = {
		headers: { Authorization: token },
	};
	const res = await axios
		.post(`${baseUrl}/validate`, null, config)
		.catch(() => {
			console.error('error validating token');
			return null;
		});
	return res;
};

export const getToken = () => {
	return token;
};

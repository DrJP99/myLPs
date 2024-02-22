import axios from 'axios';
const baseUrl = '/api/users';
let token = null;
let user = null;

export const readLocalStorage = () => {
	console.log('reading local...');
	const loggedUserToken = window.localStorage.getItem('loggedUserToken');
	const loggedUser = window.localStorage.getItem('loggedUser');
	if (loggedUserToken && loggedUser) {
		const userData = {
			token: loggedUserToken,
			username: loggedUser,
		};
		setUserData(userData);
	} else {
		clearUserData();
	}
};

export const setToken = (newToken) => {
	if (newToken) {
		token = `bearer ${newToken}`;
		window.localStorage.setItem('loggedUserToken', newToken);
	} else {
		token = null;
		window.localStorage.removeItem('loggedUserToken');
	}
	console.log('set token to:', token);
};

export const setUser = (newUser) => {
	if (newUser) {
		user = newUser;
		window.localStorage.setItem('loggedUser', newUser);
	} else {
		user = null;
		window.localStorage.removeItem('loggedUser');
	}
	console.log('set user to:', user);
};

export const clearUserData = () => {
	setToken(null);
	setUser(null);
};

export const validateToken = async () => {
	await axios
		.get(baseUrl, '/validate')
		.then(() => {
			console.log('Valid Token');
		})
		.catch(() => {
			console.log('Invalid Token');
			clearUserData();
		});
};

export const setUserData = (data) => {
	setToken(data.token);
	setUser(data.username);
	validateToken();
};

export const getToken = () => {
	return token;
};

export const getUser = () => {
	return user;
};

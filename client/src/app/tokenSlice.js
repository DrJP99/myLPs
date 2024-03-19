import { createSlice } from '@reduxjs/toolkit';
import { setToken as setUserToken } from '../services/users';

export const tokenSlice = createSlice({
	name: 'token',
	initialState: null,
	reducers: {
		setToken: (state, action) => {
			if (action.payload) {
				window.localStorage.setItem('loggedUserToken', action.payload);
				const tkn = `bearer ${action.payload}`;
				setUserToken(tkn);
				return tkn;
			} else {
				return null;
			}
		},
		clearToken: (state) => {
			window.localStorage.removeItem('loggedUserToken');
			return null;
		},
	},
});

export const { setToken, clearToken } = tokenSlice.actions;

export default tokenSlice.reducer;

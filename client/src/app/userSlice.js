import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: null,
	reducers: {
		setUser: (state, action) => {
			if (action.payload) {
				window.localStorage.setItem('loggedUser', action.payload);
				return action.payload;
			} else {
				return null;
			}
		},
		clearUser: (state) => {
			window.localStorage.removeItem('loggedUser');
			return null;
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

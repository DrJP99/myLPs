import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
	name: 'theme',
	initialState: 'light',
	reducers: {
		changeTheme: (state, action) => {
			const selectedTheme = state === 'light' ? 'dark' : 'light';
			window.localStorage.setItem('theme', selectedTheme);
			return (state = selectedTheme);
		},
		readSavedTheme: (state, action) => {
			const savedTheme = window.localStorage.getItem('theme');
			if (savedTheme !== 'light' && savedTheme !== 'dark') {
				window.localStorage.setItem('theme', 'light');
				return 'light';
			} else {
				return savedTheme;
			}
		},
	},
});

export const { changeTheme, readSavedTheme } = themeSlice.actions;

export default themeSlice.reducer;

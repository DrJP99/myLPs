import { createSlice } from '@reduxjs/toolkit';

export const artistsSlice = createSlice({
	name: 'artists',
	initialState: null,
	reducers: {
		setArtists: (state, action) => {
			if (action.payload) {
				return action.payload;
			} else {
				return [];
			}
		},
		addArtist: (state, action) => {
			state.push(action.payload);
		},
		removeArtist: (state, action) => {
			return state.filter((artist) => artist.id !== action.payload);
		},
	},
});

export const { setArtists, addArtist, removeArtist } = artistsSlice.actions;

export default artistsSlice.reducer;

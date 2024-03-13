import { createSlice } from '@reduxjs/toolkit';

export const albumsSlice = createSlice({
	name: 'albums',
	initialState: null,
	reducers: {
		setAlbums: (state, action) => {
			if (action.payload) {
				return action.payload;
			} else {
				return [];
			}
		},
		addAlbum: (state, action) => {
			return state.push(action.payload);
		},
		removeAlbum: (state, action) => {
			return state.filter((album) => album.id === action.payload);
		},
	},
});

export const { setAlbums, addAlbum, removeAlbum } = albumsSlice.actions;

export default albumsSlice.reducer;

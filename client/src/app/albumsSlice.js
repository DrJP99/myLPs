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
			state.push(action.payload);
		},
		changeAlbum: (state, action) => {
			return state.map((album) =>
				album.id === action.payload.id ? action.payload : album,
			);
		},
		removeAlbum: (state, action) => {
			return state.filter((album) => album.id !== action.payload.id);
		},
		removeByArtist: (state, action) => {
			return state.filter((album) => album.artist.id !== action.payload);
		},
	},
});

export const { setAlbums, addAlbum, changeAlbum, removeAlbum, removeByArtist } =
	albumsSlice.actions;

export default albumsSlice.reducer;

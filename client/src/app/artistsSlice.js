import { createSlice, current } from '@reduxjs/toolkit';

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
		updateArtistAlbum: (state, action) => {
			let updatedArtist = current(state).find(
				(artist) => artist.id === action.payload.artist.id,
			);
			updatedArtist = {
				...updatedArtist,
				records: updatedArtist.records.map((album) =>
					album.id === action.payload.id ? action.payload : album,
				),
			};
			return state.map((artist) =>
				artist.id === action.payload.artist.id ? updatedArtist : artist,
			);
		},
		updateArtist: (state, action) => {
			return state.map((artist) =>
				artist.id === action.payload.id ? action.payload : artist,
			);
		},
	},
});

export const {
	setArtists,
	addArtist,
	removeArtist,
	updateArtistAlbum,
	updateArtist,
} = artistsSlice.actions;

export default artistsSlice.reducer;

import { createSlice, current } from '@reduxjs/toolkit';
import ArtistComponent from '../components/ArtistComponent';

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
		addArtistAlbum: (state, action) => {
			let updatedArtist = current(state).find(
				(artist) => artist.id === action.payload.artist.id,
			);
			updatedArtist = {
				...updatedArtist,
				records: [...updatedArtist.records, action.payload],
			};
			console.log('updated artist', updatedArtist);
			return state.map((artist) =>
				artist.id === action.payload.artist.id ? updatedArtist : artist,
			);
		},
		removeArtistAlbum: (state, action) => {
			let updatedArtist = state.find(
				(artist) => artist.id === action.payload.artist.id,
			);
			updatedArtist = {
				...updatedArtist,
				records: updatedArtist.records.filter(
					(album) => album.id !== action.payload.id,
				),
			};
			return state.map((artist) =>
				artist.id === updatedArtist.id ? updatedArtist : artist,
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
	addArtistAlbum,
	removeArtistAlbum,
} = artistsSlice.actions;

export default artistsSlice.reducer;

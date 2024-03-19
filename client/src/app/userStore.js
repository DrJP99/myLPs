import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import tokenReducer from './tokenSlice';
import themeReducer from './themeSlice';
import artistsReducer from './artistsSlice';
import albumsReducer from './albumsSlice';

export default configureStore({
	reducer: {
		user: userReducer,
		token: tokenReducer,
		theme: themeReducer,
		artists: artistsReducer,
		albums: albumsReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			immutableCheck: false,
			serializableCheck: false,
		}),
});

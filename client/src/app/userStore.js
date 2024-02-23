import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tokenReducer from './tokenSlice';
import themeReducer from './themeSlice';

export default configureStore({
	reducer: {
		user: userReducer,
		token: tokenReducer,
		theme: themeReducer,
	},
});

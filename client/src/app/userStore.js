import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import tokenReducer from './tokenSlice';

export default configureStore({
	reducer: {
		user: userReducer,
		token: tokenReducer,
	},
});

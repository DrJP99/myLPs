import React, { useEffect } from 'react';
import AlbumForm from './components/AlbumForm';
import { Routes, Route, Navigate } from 'react-router-dom';
import Albums from './components/Albums';
import Album from './components/Album';
import NavBar from './components/NavBar';
import ArtistForm from './components/ArtistForm';
import Artist from './components/Artist';
import Admin from './components/Admin';
import { readLocalStorage } from './services/users';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from './app/userSlice';
import { clearToken, setToken } from './app/tokenSlice';
import Artists from './components/Artists';

import './styles/index.scss';
import { readSavedTheme } from './app/themeSlice';

function App() {
	const dispatch = useDispatch();

	const theme = useSelector((state) => state.theme);

	useEffect(() => {
		dispatch(readSavedTheme());
		readLocalStorage().then((userInfo) => {
			console.log('user info:', userInfo);
			if (userInfo) {
				dispatch(setUser(userInfo.username));
				dispatch(setToken(userInfo.token));
			} else {
				dispatch(clearUser());
				dispatch(clearToken());
			}
		});
	}, [dispatch]);

	console.log(theme);

	return (
		<div className={'app ' + theme}>
			<NavBar />
			<div className="app-container">
				<Routes>
					<Route path="/" element={<Albums />} />
					<Route path="/album/:id" element={<Album />} />
					<Route path="/album" element={<Navigate to="/" />} />
					<Route path="/add/album" element={<AlbumForm />} />
					<Route path="/add" element={<Navigate to="/add/album" />} />
					<Route path="/add/artist" element={<ArtistForm />} />
					<Route path="/artists" element={<Artists />} />
					<Route path="/artist/:id" element={<Artist />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;

import React, { useEffect } from 'react';
import { imagefrombuffer } from 'imagefrombuffer';
import AlbumForm from './components/AlbumForm';
import axios from 'axios';
import {
	BrowserRouter,
	Routes,
	Route,
	NavLink,
	Navigate,
} from 'react-router-dom';
import Albums from './components/Albums';
import Album from './components/Album';
import NavBar from './components/NavBar';
import ArtistForm from './components/ArtistForm';
import Artist from './components/Artist';
import Admin from './components/Admin';
import { readLocalStorage } from './services/users';

function App() {
	useEffect(() => {
		readLocalStorage();
	}, []);

	return (
		<div className="App">
			<NavBar />
			<Routes>
				<Route path="/" element={<Albums />} />
				<Route path="/album/:id" element={<Album />} />
				<Route path="/album" element={<Navigate to="/" />} />
				<Route path="/add/album" element={<AlbumForm />} />
				<Route path="/add" element={<Navigate to="/add/album" />} />
				<Route path="/add/artist" element={<ArtistForm />} />
				<Route path="/artist/:id" element={<Artist />} />
				<Route path="/admin" element={<Admin />} />
			</Routes>
		</div>
	);
}

export default App;

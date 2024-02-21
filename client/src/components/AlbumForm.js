import axios from 'axios';
import { useState } from 'react';

const AlbumForm = ({ handleAddAlbum }) => {
	const [title, setTitle] = useState('');
	const [artist, setArtist] = useState('');
	const [year, setYear] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newAlbum = {
			title: title,
			artist: artist,
			year: year,
		};
		console.log('new album', newAlbum);
		const res = await axios.post('/api/records', newAlbum);
		handleAddAlbum(res.data);
		setTitle('');
		setArtist('');
		setYear('');
	};

	return (
		<div>
			<h2>Add new album</h2>
			<form>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					value={title}
					id="title"
					name="title"
					onChange={({ target }) => setTitle(target.value)}
				/>
				<br />
				<label htmlFor="artist">Artist</label>
				<input
					type="text"
					value={artist}
					id="artist"
					name="artist"
					onChange={({ target }) => setArtist(target.value)}
				/>
				<br />
				<label htmlFor="year">Year</label>
				<input
					type="number"
					value={year}
					id="year"
					name="year"
					onChange={({ target }) => setYear(target.value)}
				/>
				<br />
				<button type="submit" onClick={handleSubmit}>
					Add album
				</button>
			</form>
		</div>
	);
};

export default AlbumForm;

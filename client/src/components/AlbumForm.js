import { useEffect, useState } from 'react';
import { create } from '../services/albums';
import { useNavigate } from 'react-router';
import { getAll } from '../services/artists';

const AlbumForm = () => {
	const [title, setTitle] = useState('');
	const [artist, setArtist] = useState('');
	const [allArtists, setAllArtists] = useState([]);
	const [year, setYear] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		getAll().then((data) => {
			let a = data.map((artist) => artist.name);
			setAllArtists(a);
			setArtist(a[0]);
		});
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newAlbum = {
			title: title,
			artist: artist,
			year: year,
		};

		create(newAlbum)
			.then((data) => {
				navigate('/album/' + data.id);
			})
			.catch((error) => {
				console.log(error.message);
			});
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
				<select
					value={artist}
					onChange={({ target }) => setArtist(target.value)}
				>
					{allArtists.map((artist, i) => (
						<option key={artist}>{artist}</option>
					))}
				</select>
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

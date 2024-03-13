import { useEffect, useState } from 'react';
import { create } from '../services/albums';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const AlbumForm = () => {
	const allArtists = useSelector((state) => state.artists);
	const [title, setTitle] = useState('');
	const [artist, setArtist] = useState('');
	const [year, setYear] = useState('');
	const [comment, setComment] = useState('');
	const [file, setFile] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		// TODO: add persistent data to avoid unnecessary API calls
		if (allArtists) {
			setArtist(allArtists[0]);
		}
	}, [allArtists]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newAlbum = {
			title: title,
			artist: artist,
			year: year,
			comment: comment,
			cover: file,
		};

		create(newAlbum)
			.then((data) => {
				navigate('/album/' + data.id);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const handleChangeYear = (e) => {
		const re = /[^0-9]/g;
		let yr = e.target.value.replace(re, '');
		setYear(yr);
	};

	return (
		<div>
			<h1 className="header-1">Add new album</h1>
			<div className="form">
				<form className="form-group">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						value={title}
						id="title"
						name="title"
						onChange={({ target }) => setTitle(target.value)}
					/>
					<label htmlFor="artist">Artist</label>
					<select
						value={artist}
						onChange={({ target }) => setArtist(target.value)}
						disabled={allArtists ? false : true}
					>
						{allArtists !== null ? (
							allArtists.map((artist, i) => (
								<option key={artist.id}>{artist.name}</option>
							))
						) : (
							<option>Loading...</option>
						)}
					</select>
					<label htmlFor="year">Year</label>
					<input
						id="year"
						name="year"
						value={year}
						onChange={handleChangeYear}
					/>
					<label htmlFor="cover">Cover</label>
					<input
						type="file"
						name="cover"
						onChange={({ target }) => setFile(target.files[0])}
					/>

					<label htmlFor="comment">Comments (optional)</label>
					<textarea
						name="comment"
						id="comment"
						cols="40"
						rows="5"
						value={comment}
						onChange={({ target }) => setComment(target.value)}
					/>

					<button
						className="button"
						type="submit"
						onClick={handleSubmit}
					>
						Add album
					</button>
				</form>
			</div>
		</div>
	);
};

export default AlbumForm;

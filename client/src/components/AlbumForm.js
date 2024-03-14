import { useEffect, useState } from 'react';
import { create, update } from '../services/albums';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addAlbum, changeAlbum } from '../app/albumsSlice';
import { updateArtistAlbum } from '../app/artistsSlice';

const AlbumForm = () => {
	const allArtists = useSelector((state) => state.artists);
	const albums = useSelector((state) => state.albums);

	const dispatch = useDispatch();

	const [edit, setEdit] = useState(false);

	const [title, setTitle] = useState('');
	const [albumTitle, setAlbumTitle] = useState(''); // static for title
	const [artist, setArtist] = useState('');
	const [year, setYear] = useState('');
	const [comment, setComment] = useState('');
	const [file, setFile] = useState();
	const navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		if (allArtists) {
			setArtist(allArtists[0].name);
		}
		if (albums && id) {
			const album = albums.find((album) => album.id === id);
			if (typeof album === 'undefined') {
				console.log('Album not found');
				navigate('/add');
			} else {
				setEdit(true);
				setTitle(album.title);
				setAlbumTitle(album.title);
				setArtist(album.artist.name);
				setYear(album.year);
				setComment(album.comment);
			}
		}
	}, [albums, allArtists, id, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newAlbum = {
			title: title,
			artist: artist,
			year: year,
			comment: comment,
			cover: file,
		};

		if (!edit) {
			create(newAlbum)
				.then((data) => {
					console.log(data);
					dispatch(addAlbum(data));
					navigate('/album/' + data.id);
				})
				.catch((error) => {
					console.error(error.message);
				});
		} else {
			update(id, newAlbum)
				.then((data) => {
					dispatch(changeAlbum(data));
					dispatch(updateArtistAlbum(data));
					navigate(`/album/${data.id}`);
				})
				.catch((error) => console.error(error.message));
		}
	};

	const handleChangeYear = (e) => {
		const re = /[^0-9]/g;
		let yr = e.target.value.replace(re, '');
		setYear(yr);
	};

	return (
		<div>
			<h1 className="header-1">
				{edit ? `Edit ${albumTitle}` : 'Add new album'}
			</h1>
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
						disabled={edit || !allArtists}
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
					<label htmlFor="cover">
						Cover{' '}
						{edit
							? '(Leave this blank to keep the cover image)'
							: ''}
					</label>
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
						{!edit ? 'Add album' : 'Save'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default AlbumForm;

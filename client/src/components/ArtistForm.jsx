import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addArtist, updateArtist } from '../app/artistsSlice';
import { create, update } from '../services/artists';
import { useParams } from 'react-router-dom';
import { updateAlbumArtist } from '../app/albumsSlice';

const ArtistForm = () => {
	const [name, setName] = useState('');
	const [artistName, setArtistName] = useState(''); // static name for editing
	const [origin, setOrigin] = useState('');
	const [desc, setDesc] = useState('');
	const [file, setFile] = useState();

	const artists = useSelector((state) => state.artists);
	const [edit, setEdit] = useState(false);
	const { id } = useParams();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		document.title = 'Add artist';

		if (artists && id) {
			const artist = artists.find((artist) => artist.id === id);
			if (typeof artist === 'undefined') {
				console.error('Artist not found');
				navigate('/add/artist');
			} else {
				setEdit(true);
				setName(artist.name);
				setArtistName(artist.name);
				setOrigin(artist.origin);
				setDesc(artist.desc);
				document.title = `Edit ${artist.name}`;
			}
		}
	}, [artists, id, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newArtist = {
			name: name,
			origin: origin,
			desc: desc,
			portrait: file,
		};

		if (!edit) {
			create(newArtist)
				.then((data) => {
					dispatch(addArtist(data));
					navigate('/artist/' + data.id);
				})
				.catch((error) => {
					console.log(error.message);
				});
		} else {
			update(id, newArtist)
				.then((data) => {
					dispatch(updateArtist(data));
					dispatch(
						updateAlbumArtist({ ...data, records: undefined }),
					);
					navigate(`/artist/${id}`);
				})
				.catch((error) => console.log(error.message));
		}
	};

	return (
		<div>
			<h1 className="header-1">
				{edit ? `Edit ${artistName}` : 'Add new artist'}
			</h1>
			<div className="form">
				<form className="form-group">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						value={name}
						id="name"
						name="name"
						onChange={({ target }) => setName(target.value)}
					/>
					<label htmlFor="origin">Country of Origin</label>
					<input
						type="text"
						value={origin}
						id="origin"
						name="origin"
						onChange={({ target }) => setOrigin(target.value)}
					/>
					<label htmlFor="portrait">Portrait Image</label>
					<input
						type="file"
						id="portrait"
						name="portrait"
						onChange={({ target }) => setFile(target.files[0])}
					/>

					<label htmlFor="desc">Description (optional)</label>
					<textarea
						value={desc}
						id="desc"
						name="desc"
						cols={40}
						rows={5}
						onChange={({ target }) => setDesc(target.value)}
					/>
					<button
						className="button"
						type="submit"
						onClick={handleSubmit}
					>
						{edit ? 'Save' : 'Add Artist'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ArtistForm;

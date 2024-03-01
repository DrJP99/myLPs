import { useState } from 'react';
import { useNavigate } from 'react-router';
import { create } from '../services/artists';

const ArtistForm = () => {
	const [name, setName] = useState('');
	const [origin, setOrigin] = useState('');
	const [desc, setDesc] = useState('');
	const [file, setFile] = useState();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newArtist = {
			name: name,
			origin: origin,
			desc: desc,
			portrait: file,
		};

		console.log(newArtist);

		create(newArtist)
			.then((data) => {
				navigate('/artist/' + data.id);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	return (
		<div>
			<h1 className="header-1">Add new artist</h1>
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
						Add artist
					</button>
				</form>
			</div>
		</div>
	);
};

export default ArtistForm;

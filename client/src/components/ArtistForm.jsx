import { useState } from 'react';
import { useNavigate } from 'react-router';
import { create } from '../services/artists';

const ArtistForm = () => {
	const [name, setName] = useState('');
	const [origin, setOrigin] = useState('');
	const [desc, setDesc] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const newArtist = {
			name: name,
			origin: origin,
			desc: desc,
		};

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
			<form>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					value={name}
					id="name"
					name="name"
					onChange={({ target }) => setName(target.value)}
				/>
				<br />
				<label htmlFor="origin">Origin</label>
				<input
					type="text"
					value={origin}
					id="origin"
					name="origin"
					onChange={({ target }) => setOrigin(target.value)}
				/>
				<br />
				<label htmlFor="desc">Description</label>
				<input
					type="text"
					value={desc}
					id="desc"
					name="desc"
					onChange={({ target }) => setDesc(target.value)}
				/>
				<br />
				<button type="submit" onClick={handleSubmit}>
					Add artist
				</button>
			</form>
		</div>
	);
};

export default ArtistForm;

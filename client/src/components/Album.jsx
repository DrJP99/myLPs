import React from 'react';
import { getOne } from '../services/albums';
import { useParams, useNavigate } from 'react-router';
import { deleteOne } from '../services/albums';
import { Link } from 'react-router-dom';

const Album = () => {
	// The Album is the page that displays all the information of a single album

	const [album, setAlbum] = React.useState(null);
	const { id } = useParams();
	const navigate = useNavigate();

	React.useEffect(() => {
		getOne(id)
			.then((data) => setAlbum(data))
			.catch(() => navigate('/'));
	}, [id, navigate]);

	const handleDelete = (e) => {
		e.preventDefault();
		deleteOne(id).then(() => navigate('/'));
	};

	return album ? (
		<div>
			<h1>{album.title}</h1>
			<Link to={'/artist/' + album.artist.id}>
				<p>{album.artist.name}</p>
			</Link>
			<p>{album.year}</p>
			<p>
				<button onClick={handleDelete}>Delete</button>
			</p>
		</div>
	) : (
		<p>Loading...</p>
	);
};

export default Album;

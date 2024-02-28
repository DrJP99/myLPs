import React from 'react';
import { getOne } from '../services/albums';
import { useParams, useNavigate } from 'react-router';
import { deleteOne } from '../services/albums';
import ArtistComponent from './ArtistComponent';

const Album = ({ data, inHome = false, handleCloseParent }) => {
	// The Album is the page that displays all the information of a single album

	const [album, setAlbum] = React.useState(data || null);
	const { id } = useParams();
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!album) {
			getOne(id)
				.then((data) => setAlbum(data))
				.catch(() => navigate('/'));
		}
	}, [id, navigate, album]);

	const handleDelete = (e) => {
		e.preventDefault();
		deleteOne(album.id).then(() => navigate('/'));
	};

	return album ? (
		<div>
			<h1>{album.title}</h1>
			<p>{album.year}</p>
			<ArtistComponent artist={album.artist} openModal={inHome} />
			<p>
				<button onClick={handleDelete}>Delete</button>
			</p>
		</div>
	) : (
		<p>Loading...</p>
	);
};

export default Album;

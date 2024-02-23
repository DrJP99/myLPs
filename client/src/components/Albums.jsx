import React from 'react';
import { getAll } from '../services/albums';
import AlbumComponent from './AlbumComponent';

const Albums = () => {
	const [albumData, setAlbumData] = React.useState(null);

	React.useEffect(() => {
		// TODO: add persistent data to avoid unnecessary API calls
		getAll().then((data) => setAlbumData(data));
	}, []);

	return (
		<div>
			<h1>My Albums</h1>
			{albumData ? (
				albumData.map((album) => (
					<AlbumComponent album={album} key={album.id} />
				))
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Albums;

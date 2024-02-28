import React from 'react';
import { getAll } from '../services/albums';
import AlbumComponent from './AlbumComponent';

const Albums = () => {
	// Home page
	const [albumData, setAlbumData] = React.useState(null);

	React.useEffect(() => {
		// TODO: add persistent data to avoid unnecessary API calls
		getAll().then((data) => setAlbumData(data));
	}, []);

	return (
		<div>
			<h1 className="header-1">My Albums</h1>
			<div className="grid-container">
				{albumData ? (
					albumData.map((album) => (
						<AlbumComponent
							album={album}
							key={album.id}
							openModal
						/>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
};

export default Albums;

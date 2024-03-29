import React from 'react';
import { useSelector } from 'react-redux';
import AlbumComponent from './AlbumComponent';

const Albums = () => {
	// Home page
	const [albumData, setAlbumData] = React.useState(null);
	const albums = useSelector((state) => state.albums);

	React.useEffect(() => {
		// TODO: add persistent data to avoid unnecessary API calls
		setAlbumData(albums);
		document.title = 'My albums';
	}, [albums]);

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
							prevTitle={document.title}
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

import { useEffect, useState } from 'react';
import { getAll } from '../services/artists';
import ArtistComponent from './ArtistComponent';

const Artists = () => {
	const [artists, setArtists] = useState(null);

	useEffect(() => {
		// TODO: add persistent data to avoid unnecessary API calls
		getAll().then((data) =>
			setArtists(
				data.filter((artist) => {
					return artist.records.length !== 0;
				}),
			),
		);
	}, []);

	return (
		<div>
			<h1 className="header-1">Artists</h1>
			<div className="grid-container">
				{artists ? (
					artists.map((artist) => (
						<ArtistComponent
							key={artist.id}
							artist={artist}
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

export default Artists;

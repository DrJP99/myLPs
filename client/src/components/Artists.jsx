import { useEffect, useState } from 'react';
import { getAll } from '../services/artists';
import { Link } from 'react-router-dom';

const Artists = () => {
	const [artists, setArtists] = useState(null);

	useEffect(() => {
		// TODO: add persistent data to avoid unnecessary API calls
		getAll().then((data) => setArtists(data));
	}, []);

	return (
		<div>
			<h1>Artists</h1>
			{artists ? (
				<ul>
					{artists.map((artist) => (
						<li key={artist.id}>
							<Link to={'/artist/' + artist.id}>
								{artist.name}
							</Link>
						</li>
					))}
				</ul>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default Artists;

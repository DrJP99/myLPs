import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { getArtistAlbums, getOne } from '../services/artists';
import AlbumComponent from './AlbumComponent';

const Artist = ({ data, inHome = false, handleCloseParent }) => {
	const { id } = useParams();
	const [artist, setArtist] = useState(data);

	useEffect(() => {
		if (!artist) {
			getOne(id)
				.then((data) => setArtist(data))
				.catch(() => Navigate('/artists'));
		}
		if (artist && !artist.records) {
			getArtistAlbums(artist.id).then((data) => {
				setArtist({ ...artist, records: data });
			});
		}
	}, [id, artist]);

	return artist ? (
		<div>
			<h2 className="header-2">{artist.name}</h2>
			<p>{artist.origin}</p>
			<p>{artist.desc}</p>
			<h3 className="header-3">Records:</h3>
			{artist.records ? (
				<div className="grid-container">
					{artist.records.map((record) => (
						<AlbumComponent
							album={{ ...record, artist: artist }}
							key={record.id}
							openModal={inHome}
						/>
					))}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	) : (
		<p>Loading...</p>
	);
};

export default Artist;

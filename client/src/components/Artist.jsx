import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router';
import { getArtistAlbums, getOne } from '../services/artists';
import AlbumComponent from './AlbumComponent';
import { decodeImage } from '../utils/image';
import { Link } from 'react-router-dom';

const Artist = ({ data, inHome = false, handleCloseParent }) => {
	const { id } = useParams();
	const [artist, setArtist] = useState(data);
	const [portraitImg, setPortraitImg] = useState();

	const user = useSelector((state) => state.user);

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
		if (artist && artist.portrait !== undefined) {
			setPortraitImg(decodeImage(artist.portrait));
		}
	}, [id, artist]);

	return artist ? (
		<div className="artist">
			<div className="item-header">
				<Link to={!inHome && `/artist/${artist.id}`}>
					<img
						src={`data:image/png;base64,${portraitImg}`}
						alt={`${artist.name} portrait`}
						className="item-image artist-portrait"
					/>
				</Link>
				<div className="item-header-titles">
					<Link to={!inHome && `/artist/${artist.id}`}>
						<h1 className="item-title">{artist.name}</h1>
					</Link>
					<p className="item-subtitle">{artist.origin}</p>
				</div>
			</div>
			{artist.desc && (
				<div className="item-info">
					<p>{artist.desc}</p>
				</div>
			)}
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
			{user && (
				<p>
					<button
						className="button"
						onClick={() => console.log('try to delete...')}
					>
						Delete
					</button>
				</p>
			)}
		</div>
	) : (
		<p>Loading...</p>
	);
};

export default Artist;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router';
import AlbumComponent from './AlbumComponent';
import { decodeImage } from '../utils/image';
import { Link } from 'react-router-dom';
import { deleteOne } from '../services/artists';
import { removeByArtist } from '../app/albumsSlice';
import { removeArtist } from '../app/artistsSlice';

const Artist = ({ data, inHome = false, handleCloseParent }) => {
	const artists = useSelector((state) => state.artists);
	const albums = useSelector((state) => state.albums);
	const dispatch = useDispatch();

	const { id } = useParams();
	const [artist, setArtist] = useState(data);
	const [portraitImg, setPortraitImg] = useState();

	const navigate = useNavigate();

	const user = useSelector((state) => state.user);

	const handleDelete = (e) => {
		e.preventDefault();

		if (
			window.confirm(
				`Are you sure you want to delete the artist ${artist.name}? All of their albums will also be deleted.`,
			)
		) {
			deleteOne(artist.id)
				.then(() => {
					dispatch(removeByArtist(artist.id));
					dispatch(removeArtist(artist.id));
					navigate('/artists');
				})
				.catch((e) => {
					console.error(e.message);
				});
		}
	};

	const handleEdit = (e) => {
		e.preventDefault();
		navigate(`/edit/artist/${artist.id}`);
	};

	useEffect(() => {
		if (!artist && artists) {
			document.title = 'Artist';
			const myId = data ? data.id : id;
			const newArtist = artists.find((artist) => artist.id === myId);
			if (!newArtist) {
				console.error(
					`Artist with id ${myId} could not be found. Redirecting to artists page...`,
				);
				navigate('/artists');
			}
			setArtist(newArtist);
		}
		if (artist && !artist.records) {
			const artistAlbums = albums.filter(
				(album) => album.artist.id === artist.id,
			);
			setArtist({ ...artist, records: artistAlbums });
		}
		if (artist && artist.portrait !== undefined) {
			setPortraitImg(decodeImage(artist.portrait));
		}
		if (artist) {
			document.title = artist.name;
		}
	}, [id, artist, artists, data, albums, navigate]);

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
				<p className="flex">
					<button className="button" onClick={handleEdit}>
						Edit
					</button>
					<button
						className="button float-right"
						onClick={handleDelete}
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

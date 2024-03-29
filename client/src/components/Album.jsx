import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { deleteOne } from '../services/albums';
import ArtistComponent from './ArtistComponent';
import { useDispatch, useSelector } from 'react-redux';
import { decodeImage } from '../utils/image';
import { Link } from 'react-router-dom';
import { removeAlbum } from '../app/albumsSlice';
import { removeArtistAlbum } from '../app/artistsSlice';

const Album = ({ data, inHome = false, handleCloseParent }) => {
	// The Album is the page that displays all the information of a single album
	const albums = useSelector((state) => state.albums);
	const dispatch = useDispatch();

	const [album, setAlbum] = useState(null);
	const [coverImg, setCoverImg] = useState();
	const { id } = useParams();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		if (!album && albums) {
			const myId = data ? data.id : id;
			const newAlbum = albums.find((album) => album.id === myId);
			if (!newAlbum) {
				console.error(
					`Album with id ${myId} could not be found. Redirecting home...`,
				);
				navigate('/');
			}
			document.title = `${newAlbum.title}`;
			setAlbum(newAlbum);
		}
		if (album && album.cover !== undefined) {
			setCoverImg(decodeImage(album.cover));
		}
	}, [id, navigate, album, albums, data]);

	const handleDelete = (e) => {
		e.preventDefault();
		deleteOne(album.id).then(() => {
			dispatch(removeAlbum(album));
			dispatch(removeArtistAlbum(album));
			navigate('/');
		});
	};

	const handleEdit = (e) => {
		e.preventDefault();
		navigate(`/edit/album/${album.id}`);
	};

	return album ? (
		<div className="album">
			<div className="item-header">
				<Link to={!inHome && `/album/${album.id}`}>
					<img
						src={`data:image/png;base64,${coverImg}`}
						alt="cover"
						className="item-image album-cover"
					/>
				</Link>
				{/* <div className="flex-break"></div> */}
				<div className="item-header-titles">
					<Link to={!inHome && `/album/${album.id}`}>
						<h1 className="item-title">{album.title}</h1>
					</Link>
					<p className="item-subtitle">{album.year}</p>
				</div>
			</div>
			{album.comment && (
				<div className="item-info">
					<p>{album.comment}</p>
				</div>
			)}

			<ArtistComponent artist={album.artist} openModal={inHome} />

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

export default Album;

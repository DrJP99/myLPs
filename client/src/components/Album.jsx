import { useEffect, useState } from 'react';
import { getOne } from '../services/albums';
import { useParams, useNavigate } from 'react-router';
import { deleteOne } from '../services/albums';
import ArtistComponent from './ArtistComponent';
import { useSelector } from 'react-redux';
import { decodeImage } from '../utils/image';
import { Link } from 'react-router-dom';

const Album = ({ data, inHome = false, handleCloseParent }) => {
	// The Album is the page that displays all the information of a single album

	const [album, setAlbum] = useState(data || null);
	const [coverImg, setCoverImg] = useState();
	const { id } = useParams();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		if (!album) {
			getOne(id)
				.then((data) => {
					setAlbum(data);
				})
				.catch(() => navigate('/'));
		}
		if (album && album.cover !== undefined) {
			setCoverImg(decodeImage(album.cover));
		}
	}, [id, navigate, album]);

	const handleDelete = (e) => {
		e.preventDefault();
		deleteOne(album.id).then(() => navigate('/'));
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
				<p>
					<button className="button" onClick={handleDelete}>
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

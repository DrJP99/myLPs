import { Link } from 'react-router-dom';

const AlbumComponent = ({ album }) => {
	// The Album Component renders the basic information of an album on the Albums page
	return (
		<div className="card">
			<Link to={'/album/' + album.id}>
				<div className="image-cover"></div>
			</Link>
			<div className="card-headers">
				<p className="card-title">
					<Link to={'/album/' + album.id}>{album.title}</Link>
				</p>
				<p className="card-subtitle">
					<Link to={'/artist/' + album.artist.id}>
						{album.artist.name}
					</Link>
					{' - '}({album.year})
				</p>
			</div>
		</div>
	);
};

export default AlbumComponent;

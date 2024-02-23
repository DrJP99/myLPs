import { Link } from 'react-router-dom';

const ArtistComponent = ({ artist }) => {
	return (
		<div className="card">
			<Link to={'/artist/' + artist.id}>
				<div className="image-artist"></div>
			</Link>
			<div className="card-headers">
				<p className="card-title text-center">
					<Link to={'/artist/' + artist.id}>{artist.name}</Link>
				</p>
			</div>
		</div>
	);
};

export default ArtistComponent;

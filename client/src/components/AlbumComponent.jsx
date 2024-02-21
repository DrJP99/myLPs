import { Link } from 'react-router-dom';

const AlbumComponent = ({ album }) => {
	// The Album Component renders the basic information of an album on the Albums page
	return (
		<div>
			<p>
				<Link to={'/album/' + album.id}>{album.title}</Link> -{' '}
				<Link to={'/artist/' + album.artist.id}>
					{album.artist.name}
				</Link>{' '}
				({album.year})
			</p>
		</div>
	);
};

export default AlbumComponent;

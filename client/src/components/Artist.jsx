import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getOne } from '../services/artists';
import { Link } from 'react-router-dom';

const Artist = () => {
	const { id } = useParams();
	const [artist, setArtist] = useState(null);

	useEffect(() => {
		getOne(id).then((data) => setArtist(data));
	}, [id]);

	return artist ? (
		<div>
			<h1>{artist.name}</h1>
			<p>{artist.origin}</p>
			<p>{artist.desc}</p>
			<h2>Records:</h2>
			<ul>
				{artist.records.map((records) => (
					<li key={records.id}>
						<Link to={'/album/' + records.id}>{records.title}</Link>
					</li>
				))}
			</ul>
		</div>
	) : (
		<p>Loading...</p>
	);
};

export default Artist;

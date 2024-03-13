import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAll } from '../services/artists';
import ArtistComponent from './ArtistComponent';

const Artists = () => {
	const user = useSelector((state) => state.user);
	const [artists, setArtists] = useState(null);
	const [filteredArtists, setFilteredArtists] = useState(null);
	const [filter, setFilter] = useState(true); // true = shows only artists with records

	const handleFilter = (e) => {
		e.preventDefault();
		setFilter(!filter);
	};

	useEffect(() => {
		// TODO: add persistent data to avoid unnecessary API calls
		getAll().then((data) => {
			setArtists(data);
			setFilteredArtists(
				data.filter((artist) => artist.records.length !== 0),
			);
		});
	}, []);

	useEffect(() => {
		const filterList = (option) => {
			if (artists) {
				setFilteredArtists(
					option
						? artists.filter(
								(artist) => artist.records.length !== 0,
						  )
						: artists,
				);
			}
		};
		filterList(filter);
	}, [filter, artists]);

	return (
		<div>
			<h1 className="header-1">Artists</h1>
			{user ? (
				<button className="button" onClick={(e) => handleFilter(e)}>
					{filter
						? 'Show all artists'
						: 'Show only artists with records'}
				</button>
			) : null}

			<div className="grid-container">
				{artists ? (
					filteredArtists.map((artist) => (
						<ArtistComponent
							key={artist.id}
							artist={artist}
							openModal
						/>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
};

export default Artists;

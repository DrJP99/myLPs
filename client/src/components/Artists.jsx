import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ArtistComponent from './ArtistComponent';

const Artists = () => {
	const user = useSelector((state) => state.user);
	const artists = useSelector((state) => state.artists);

	const [artistData, setArtistData] = useState(null);
	const [filteredArtists, setFilteredArtists] = useState(null);
	const [filter, setFilter] = useState(true); // true = shows only artists with records

	const handleFilter = (e) => {
		e.preventDefault();
		setFilter(!filter);
	};

	useEffect(() => {
		// TODO: add persistent data to avoid unnecessary API calls
		setArtistData(artists);
	}, [artists]);

	useEffect(() => {
		document.title = 'Artists';
		const filterList = (option) => {
			if (artistData) {
				setFilteredArtists(
					option
						? artistData.filter(
								(artist) => artist.records.length !== 0,
						  )
						: artistData,
				);
			}
		};
		filterList(filter);
	}, [filter, artistData]);

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
				{filteredArtists ? (
					filteredArtists.map((artist) => (
						<ArtistComponent
							key={artist.id}
							artist={artist}
							openModal
							prevTitle={document.title}
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

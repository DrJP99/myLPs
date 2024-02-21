import React from 'react';
import { imagefrombuffer } from 'imagefrombuffer';
import AlbumForm from './components/AlbumForm';

function App() {
	const [albumData, setAlbumData] = React.useState([]);

	React.useEffect(() => {
		fetch('/api/records')
			.then((res) => res.json())
			.then((data) => setAlbumData(data));
	}, []);

	const handleAddAlbum = (newAlbum) => {
		setAlbumData(albumData.concat(newAlbum));
	};

	console.log('ALBUM DATA main', albumData);
	return (
		<div className="App">
			<header className="App-header">
				<h1>My Albums</h1>
			</header>
			<ul>
				{albumData &&
					albumData.map((album) => (
						<li key={album.id}>
							{album.title} - {album.year} ({album.artist.name})
							{/* {album.cover && (
								<img
									src={imagefrombuffer({
										type: album.cover?.contentType,
										data: album.cover?.data?.data,
									})}
									alt={album.title}
								/>
							)} */}
						</li>
					))}
			</ul>
			<AlbumForm handleAddAlbum={handleAddAlbum} />
		</div>
	);
}

export default App;

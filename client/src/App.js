import React from 'react';

function App() {
	const [albumData, setAlbumData] = React.useState(null);

	React.useEffect(() => {
		fetch('/api/records')
			.then((res) => res.json())
			.then((data) => setAlbumData(data));
	}, []);

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
						</li>
					))}
			</ul>
		</div>
	);
}

export default App;

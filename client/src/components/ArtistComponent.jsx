import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import Artist from './Artist';

const ArtistComponent = ({ artist }) => {
	const [modalShow, setModalShow] = useState(false);

	const handleShowModal = (e) => {
		e.preventDefault();
		setDisplay(true);
	};

	const setDisplay = (value) => {
		setModalShow(value);
		const new_url = value ? '/artist/' + artist.id : '/artists';
		window.history.pushState(null, '', new_url);
	};

	return (
		<>
			{modalShow && (
				<Modal setDisplay={setDisplay}>
					<Artist data={artist} />
				</Modal>
			)}
			<div className="card-container">
				<div className="card">
					<Link to={''} onClick={handleShowModal}>
						<div className="image-artist"></div>
					</Link>
					<div className="card-headers">
						<p className="card-title text-center">
							<Link to={''} onClick={handleShowModal}>
								{artist.name}
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default ArtistComponent;

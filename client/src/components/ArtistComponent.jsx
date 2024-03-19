import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Artist from './Artist';
import { decodeImage } from '../utils/image';

const ArtistComponent = ({ artist, openModal = false, prevTitle = '' }) => {
	const [modalShow, setModalShow] = useState(false);

	const navigate = useNavigate();

	const handleShowModal = (e) => {
		e.preventDefault();
		if (openModal) {
			setDisplay(true);
		} else {
			// handleCloseParent();
			navigate('/artist/' + artist.id);
		}
	};

	const setDisplay = (value) => {
		setModalShow(value);
		const new_url = value ? '/artist/' + artist.id : '/artists';
		window.history.pushState(null, '', new_url);
	};

	return (
		<>
			{openModal && modalShow && (
				<Modal setDisplay={setDisplay} prevTitle={prevTitle}>
					<Artist data={artist} inModal={true} />
				</Modal>
			)}
			<div className="card-container">
				<div className="card">
					<Link to={'/artist/' + artist.id} onClick={handleShowModal}>
						<img
							src={`data:image/png;base64,${decodeImage(
								artist.portrait,
							)}`}
							alt={`${artist.name} portrait`}
							className="image-artist"
						/>
					</Link>
					<div className="card-headers">
						<p className="card-title text-center">
							<Link
								to={'/artist/' + artist.id}
								onClick={handleShowModal}
							>
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

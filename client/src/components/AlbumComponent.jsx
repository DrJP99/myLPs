import { Link, Navigate, useNavigate } from 'react-router-dom';

import Modal from './Modal';
import { useState } from 'react';
import Album from './Album';

const AlbumComponent = ({ album, inModal = false }) => {
	// The Album Component renders the basic information of an album on the Albums page

	const [modalShow, setModalShow] = useState(false);
	const navigate = useNavigate();

	const handleShowModal = (e) => {
		e.preventDefault();
		if (!inModal) {
			setDisplay(true);
		} else {
			navigate('/album/' + album.id);
		}
	};

	const setDisplay = (value) => {
		setModalShow(value);
		const new_url = value ? '/album/' + album.id : '/';
		window.history.pushState(null, '', new_url);
	};

	return (
		<>
			{modalShow && (
				<Modal setDisplay={setDisplay}>
					<Album data={album} inModal />
				</Modal>
			)}
			<div className="card-container">
				<div className="card">
					<Link to={'/album/' + album.id} onClick={handleShowModal}>
						<div className="image-cover"></div>
					</Link>
					<div className="card-headers">
						<p className="card-title">
							<Link to={''} onClick={handleShowModal}>
								{album.title}
							</Link>
						</p>
						<p className="card-subtitle">
							<Link to={'/artist/' + album.artist.id}>
								{album.artist.name}
							</Link>
							{' - '}({album.year})
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default AlbumComponent;

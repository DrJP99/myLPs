const Modal = ({ setDisplay, children }) => {
	const handleCloseModal = (e) => {
		e.preventDefault();
		setDisplay(false);
	};

	return (
		<div className="modal">
			<div className="modal-content">
				<span className="close" onClick={handleCloseModal}>
					&times;
				</span>
				{children}
			</div>
		</div>
	);
};

export default Modal;

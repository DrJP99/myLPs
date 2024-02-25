const Modal = ({ setDisplay, children }) => {
	const handleCloseModal = (e) => {
		e.preventDefault();
		setDisplay(false);
	};

	// window.addEventListener('keydown', (e) => {
	// 	if (e.key === 'Escape') {
	// 		console.log('Escape...');
	// 	}
	// });

	return (
		<div className="modal" onClick={handleCloseModal}>
			<div className="modal-content" onClick={(e) => e.stopPropagation()}>
				<span className="close" onClick={handleCloseModal}>
					&times;
				</span>
				{children}
			</div>
		</div>
	);
};

export default Modal;

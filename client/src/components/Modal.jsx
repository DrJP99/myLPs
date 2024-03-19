import { useEffect } from 'react';

const Modal = ({ setDisplay, children, prevTitle = '' }) => {
	const handleCloseModal = (e) => {
		e.preventDefault();
		document.body.setAttribute('style', '');
		setDisplay(false);
	};

	useEffect(() => {
		document.body.setAttribute('style', `overflow: hidden`);
		return () => {
			document.body.setAttribute('style', '');
			document.title = prevTitle;
		};
	}, [prevTitle]);

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

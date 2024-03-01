import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../app/themeSlice';

const NavBar = () => {
	const user = useSelector((state) => state.user);

	const theme = useSelector((state) => state.theme);
	const dispatch = useDispatch();

	const handleThemeChange = (e) => {
		e.preventDefault();
		dispatch(changeTheme());
	};

	return (
		<nav className="navbar">
			<ul>
				<Link to="/" className="navbar-item">
					<li>Home</li>
				</Link>
				<Link to="/artists" className="navbar-item">
					<li>Artists</li>
				</Link>
				<Link to="/about" className="navbar-item">
					<li>About</li>
				</Link>
				{user ? (
					<>
						<Link to="/add/album" className="navbar-item">
							<li>Add Album</li>
						</Link>
						<Link to="/add/artist" className="navbar-item">
							<li>Add Artist</li>
						</Link>
						<Link to="/admin" className="navbar-item">
							<li>Admin</li>
						</Link>
					</>
				) : (
					<></>
				)}
				<button
					className="navbar-item float-right"
					onClick={handleThemeChange}
				>
					<li>{theme} theme</li>
				</button>
			</ul>
		</nav>
	);
};

export default NavBar;

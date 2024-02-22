import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/add/album">Add Album</Link>
				</li>
				<li>
					<Link to="/add/artist">Add Artist</Link>
				</li>
				<li>
					<Link to="/admin">Admin</Link>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;

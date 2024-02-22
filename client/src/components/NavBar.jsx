import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
	const user = useSelector((state) => state.user);

	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				{user ? (
					<>
						<li>
							<Link to="/add/album">Add Album</Link>
						</li>
						<li>
							<Link to="/add/artist">Add Artist</Link>
						</li>
						<li>
							<Link to="/admin">Admin</Link>
						</li>
					</>
				) : (
					<></>
				)}
			</ul>
		</nav>
	);
};

export default NavBar;

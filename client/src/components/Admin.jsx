import { useEffect, useState } from 'react';
import { clearUserData, getUser } from '../services/users';
import LoginForm from './LoginForm';

const Admin = () => {
	const [user, setUser] = useState();

	useEffect(() => {
		setUser(getUser());
	}, []);

	const handleLogout = (e) => {
		e.preventDefault();
		clearUserData();
		setUser(null);
	};

	const handleLogin = () => {
		setUser(getUser());
	};

	console.log(user);
	return (
		<div>
			<h1>Admin</h1>
			{user ? (
				<div>
					<p>{user} logged in</p>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<LoginForm handleSetUser={handleLogin} />
			)}
		</div>
	);
};

export default Admin;

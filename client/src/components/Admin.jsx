import LoginForm from './LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../app/userSlice';
import { clearToken } from '../app/tokenSlice';
import { useEffect } from 'react';

const Admin = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(clearUser());
		dispatch(clearToken());
	};

	useEffect(() => {
		document.title = 'Admin page';
	}, []);

	return (
		<div>
			<h1 className="header-1">Admin</h1>
			{user ? (
				<div>
					<p>{user} logged in</p>
					<button className="button" onClick={handleLogout}>
						Logout
					</button>
				</div>
			) : (
				<LoginForm />
			)}
		</div>
	);
};

export default Admin;

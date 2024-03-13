import LoginForm from './LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../app/userSlice';
import { clearToken } from '../app/tokenSlice';

const Admin = () => {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const handleLogout = (e) => {
		e.preventDefault();
		dispatch(clearUser());
		dispatch(clearToken());
	};

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

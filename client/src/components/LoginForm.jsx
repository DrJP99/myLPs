import { useState } from 'react';
import { login } from '../services/login';
// import { setUserData } from '../services/users';
import { setUser } from '../app/userSlice';
import { setToken } from '../app/tokenSlice';
import { useDispatch } from 'react-redux';

const LoginForm = () => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const handleLogin = async (e) => {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;

		await login({ username, password })
			.then((res) => {
				dispatch(setUser(res.username));
				dispatch(setToken(res.token));
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div>
			<div className="form">
				<div className="form-group">
					<h2 className="header-2">Login</h2>
					<form onSubmit={handleLogin}>
						<div>
							<label htmlFor="username">Username:</label>
							<input
								type="text"
								id="username"
								value={username}
								onChange={(target) => {
									setUsername(target.value);
								}}
							/>
						</div>
						<div>
							<label htmlFor="password">Password:</label>
							<input
								type="password"
								id="password"
								value={password}
								onChange={(target) => setPassword(target.value)}
							/>
						</div>
						<button className="button" type="submit">
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;

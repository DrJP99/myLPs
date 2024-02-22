import { useState } from 'react';
import { login } from '../services/login';
import { setUserData } from '../services/users';

const LoginForm = ({ handleSetUser }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (e) => {
		e.preventDefault();
		const username = e.target.username.value;
		const password = e.target.password.value;

		await login({ username, password })
			.then((res) => {
				setUserData(res);
				handleSetUser();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div>
			<h3>Login</h3>
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
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default LoginForm;

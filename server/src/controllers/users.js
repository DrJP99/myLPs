const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
	const user = await User.findById(req.params.id).catch((error) => {
		res.status(404).json({ error: error.message });
	});
	res.json(user);
});

usersRouter.post('/validate', (req, res) => {
	const user = req.user;

	if (!user) {
		return res.status(401).json({
			error: 'token missing or invalid',
		});
	}
	res.status(200).json(user);
});

usersRouter.post('/', async (req, res) => {
	const { username, password } = req.body;

	// Delete or comment the following lines to create a the first user
	// const user = req.user;
	// if (!user) {
	// 	return res.status(401).json({
	// 		error: 'token missing or invalid',
	// 	});
	// }

	if (!password || password.length < 3) {
		return res.status(400).json({
			error: 'Password must be at least 3 characters long',
		});
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);
	const newUser = new User({
		username,
		passwordHash,
	});

	const savedUser = await newUser.save().catch((error) => {
		return res.status(400).json({
			error: error.message,
		});
	});
	res.status(200).json(savedUser);
});

usersRouter.put('/:id', async (req, res) => {
	const { password } = req.body;

	const user = req.user;
	if (!user || user._id.toString() !== req.params.id.toString()) {
		return res
			.status(401)
			.json({
				error: 'token missing or invalid',
			})
			.end();
	}

	if (!password || password.length < 3) {
		return res.status(400).json({
			error: 'Password must be at least 3 characters long',
		});
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const updatedUser = await User.findByIdAndUpdate(
		req.params.id,
		{ passwordHash },
		{ new: true },
	).catch((error) => {
		return res.status(400).json({
			error: error.message,
		});
	});
	res.status(200).json(updatedUser);
});

usersRouter.delete('/:id', async (req, res) => {
	const user = req.user;
	if (!user) {
		return res.status(401).json({
			error: 'token missing or invalid',
		});
	}

	await User.findByIdAndRemove(req.params.id).catch((error) => {
		return res.status(400).json({
			error: error.message,
		});
	});
	res.status(204).end();
});

module.exports = usersRouter;

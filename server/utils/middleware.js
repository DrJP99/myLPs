const morgan = require('morgan');
const logger = require('./logger');
const config = require('./config');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../src/models/user');

morgan.token('body', (req) => {
	return JSON.stringify(req.body);
});

morgan.token('splitter', (req) => {
	return '\x1b[36m--------------------------------------------\x1b[0m\n';
});

morgan.token('statusColor', (req, res, args) => {
	// get the status code if response written
	var status = (
		typeof res.headersSent !== 'boolean'
			? Boolean(res.header)
			: res.headersSent
	)
		? res.statusCode
		: undefined;

	// get status color
	var color =
		status >= 500
			? 31 // red
			: status >= 400
			? 33 // yellow
			: status >= 300
			? 36 // cyan
			: status >= 200
			? 32 // green
			: 0; // no color

	return '\x1b[' + color + 'm' + status + '\x1b[0m';
});

const requestLogger = morgan(
	`:splitter\x1b[33m:method\x1b[0m \x1b[36m:url\x1b[0m :statusColor :response-time ms - length|:res[content-length] ${
		process.env.NODE_ENV === 'development' ? `:body` : ``
	}`,
);

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		req.token = authorization.substring(7);
	} else if (authorization) {
		req.token = authorization;
	}

	next();
};

const userExtractor = async (req, res, next) => {
	if (req.token) {
		try {
			const decodedToken = jwt.verify(req.token, process.env.SECRET);

			if (!decodedToken.id) {
				return res
					.status(401)
					.json({ error: 'token missing or invalid' });
			}

			const user = await User.findById(decodedToken.id);

			if (!user) {
				res.status(404).json({ error: 'user not found' }).end();
			}
			req.user = user;
		} catch (error) {
			return res.status(401).json({ error: 'token missing or invalid' });
		}
	}
	next();
};

const errorHandler = (error, req, res, next) => {
	logger.error(error.message);

	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformed id' });
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message });
	} else if (error.name === 'JsonWebTokenError') {
		return res.status(400).json({ error: error.message });
	} else if (error.name === 'TokenExpiredError') {
		return res.status(401).json({ error: 'token expired' });
	} else if (
		error.name === 'MongoServerError' &&
		error.message.includes('E11000 duplicate key error')
	) {
		return res.status(400).json({ error: 'expected `name` to be unique' });
	}

	next(error);
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
};

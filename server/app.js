const express = require('express');
const app = express();
const config = require('./utils/config');

const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

app.use(middleware.tokenExtractor);

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const recordsRouter = require('./src/controllers/records');
const artistsRouter = require('./src/controllers/artists');
const usersRouter = require('./src/controllers/users');
const loginRouter = require('./src/controllers/login');
const { stat } = require('fs');

logger.info('Connecting to:', config.MONGODB_URI);

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info('connected to MongoDB');
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB:', error.message);
	});

app.use(express.json());
app.use(express.static('build'));
app.use(middleware.requestLogger);

app.use('/api/records', middleware.userExtractor, recordsRouter);
app.use('/api/artists', middleware.userExtractor, artistsRouter);
app.use('/api/users', middleware.userExtractor, usersRouter);
app.use('/api/login', loginRouter);

app.get('/api', (req, res) => {
	res.json({ message: 'Hello world!!' });
});

app.get('/api/secret', (req, res) => {
	res.json({ message: 'This is a super secret message' });
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

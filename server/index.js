const app = require('./app');
const ENV_PORT = require('./utils/config').PORT;
const logger = require('./utils/logger');

const PORT = ENV_PORT || 3001;

app.listen(PORT, () => {
	logger.info(`Server listening on ${PORT}`);
});

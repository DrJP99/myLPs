const app = require('./app');
const ENV_PORT = require('./utils/config').PORT;
const ENV_HOSTNAME = require('./utils/config').HOSTNAME;
const logger = require('./utils/logger');

const PORT = ENV_PORT || 3003;

app.listen(PORT, () => {
	logger.info(`Server listening on ${ENV_HOSTNAME}:${PORT}`);
});

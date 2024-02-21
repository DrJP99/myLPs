const app = require('./app');
const ENV_PORT = require('./utils/config').PORT;

const PORT = ENV_PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});

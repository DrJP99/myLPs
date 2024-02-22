const info = (...params) => {
	if (process.env.NODE_ENV !== 'test') {
		console.log(...params);
	}
};

const error = (...params) => {
	// Prints errors in color red
	if (process.env.NODE_ENV !== 'test') {
		console.error('\x1b[31m', ...params);
	}
};

module.exports = { info, error };

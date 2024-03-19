const protocol = window.location.protocol;
const hostname = window.location.hostname;
export const serverUrl =
	process.env.NODE_ENV === 'production'
		? `${protocol}//${hostname}:3003`
		: '';

export default serverUrl;

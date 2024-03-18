export const decodeImage = (data) => {
	if (!data) return;

	const bytes = new Uint8Array(data.data.data);
	const len = bytes.byteLength;
	let binary = '';
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return btoa(binary);
};

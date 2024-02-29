export const decodeImage = (data) => {
	if (!data) return;
	return btoa(String.fromCharCode(...new Uint8Array(data.data.data)));
};
